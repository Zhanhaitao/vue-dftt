module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: true
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
