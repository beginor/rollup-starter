/* eslint-env node */
const rules = require('./.eslintrc.rules.cjs');

/**
 * eslint-env node
 * @type { import('@typescript-eslint/utils/dist').TSESLint.Linter.Config }
 * */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  root: true,
  env: {
    browser: true,
    es6: true
  },
  ignorePatterns: [
    "node_modules/**/*",
    "dist/**/*",
    "scripts/*",
    ".idea/**/*",
    ".vscode/**/*",
    "*.cjs",
    "*.js",
    "*.mjs"
  ],
  overrides: [
    {
      files: ["*.js", "*.mjs"],
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    }
  ]
}
