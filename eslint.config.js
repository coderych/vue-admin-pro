// @ts-check
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  jsx: true,
  isInEditor: false,
  rules: {
    'no-console': 'off',
  },
}, oxlint.configs['flat/recommended'])
