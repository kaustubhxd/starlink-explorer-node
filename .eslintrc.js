// https://dev.to/drsimplegraffiti/eslint-configuration-for-node-project-275l
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:require-extensions/recommended'

  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
  },
  plugins: [
    'require-extensions'
  ]
}
