// https://github.com/nuxt/eslint-plugin-nuxt/issues/173
// ./modules/auto-import-eslint.ts

import { basename, resolve } from 'path'

import type { ImportPresetWithDeprecation } from '@nuxt/schema'
import type { Import } from 'unimport'
import { addTemplate, defineNuxtModule } from '@nuxt/kit'

const padding = ' '.repeat(4)
const autoImportEslint = defineNuxtModule({
  setup(_, nuxt) {
    const autoImports: { [key: string]: string[] } = {}

    nuxt.hook(
      'autoImports:sources',
      (defaultPresets: ImportPresetWithDeprecation[]) => {
        defaultPresets.forEach((preset) => {
          autoImports[preset.from] = preset.imports.map((p) => p.toString())
        })
      }
    )

    nuxt.hook('autoImports:extend', (composableImport: Import[]) => {
      autoImports.composables = composableImport.map((autoImport) => {
        if (autoImport.as) return autoImport.as!.toString()
        return autoImport.name.toString()
      })
    })

    nuxt.hook('modules:done', () => {
      const outDir = basename(nuxt.options.buildDir)
      const filename = '.eslintrc.json'
      const fullPath = resolve(outDir, filename)

      const getContents = () => {
        // To prevent formatter accidentally fix padding of template string
        let contents = ''
        contents += '{\n'
        contents += '  "globals": {'
        for (const autoImport in autoImports) {
          contents += `\n${padding}// ${autoImport}`
          autoImports[autoImport].forEach((imp) => {
            contents += '\n'
            contents += `${padding}"${imp}": "readonly",`
          })
        }
        contents = `${contents.slice(0, -1)}\n`
        contents += '  }\n'
        contents += '}\n'

        return contents
      }

      addTemplate({
        filename,
        getContents,
        write: true,
      })

      console.log(`globals file is generated at ${fullPath}`)
    })
  },
})

export default autoImportEslint
