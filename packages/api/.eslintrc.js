module.exports = {
  extends: ['plugin:adonis/typescriptApp', 'prettier'],
  plugins: ['import-helpers', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'prettier/prettier': ['error'],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^App/Controllers/',
          '/^App/Exceptions/',
          '/^App/Models/',
          '/^App/Services/',
          '/^App/Strategies/',
          '/^App/Validators/',
          '/^App/',
          '/^Config/',
          '/^Contracts/',
          '/^Database/',
          ['parent', 'sibling'],
          'index',
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}
