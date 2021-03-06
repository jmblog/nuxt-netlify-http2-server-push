module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['jest', 'vue', 'prettier'],
  rules: {
    // // Allow paren-less arrow functions
    // 'arrow-parens': 0,
    // // Allow async-await
    // 'generator-star-spacing': 0,
    // // Allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // // Do not allow console.logs etc...
    // 'no-console': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  },
  globals: {
    'jest/globals': true,
    jasmine: true
  }
};
