import { configure, defineRule } from 'vee-validate'
import {
  alpha,
  alpha_spaces as alphaSpaces,
  max,
  regex,
  required,
} from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import tr from '@vee-validate/i18n/dist/locale/tr.json'

export default defineNuxtPlugin(() => {
  /*   Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
  }) */
  defineRule('required', required)
  defineRule('max', max)
  defineRule('alpha', alpha)
  defineRule('alpha_spaces', alphaSpaces)
  defineRule('regex', regex)

  configure({
    generateMessage: localize({
      en,
      tr,
    }),
  })
})
