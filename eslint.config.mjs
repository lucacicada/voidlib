import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  rules: {
    'antfu/top-level-function': 'off',
  },
})
