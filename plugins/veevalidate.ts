import { configure, defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import tr from '@vee-validate/i18n/dist/locale/tr.json'

export default defineNuxtPlugin(() => {
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
  })
  configure({
    generateMessage: localize({
      en,
      tr,
    }),
  })
})
