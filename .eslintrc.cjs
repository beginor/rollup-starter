const rules = require('./.eslintrc.rules.cjs');

/**
 * @type { import('@typescript-eslint/utils/dist').TSESLint.Linter.ConfigType }
 */
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
    "*.mjs",
    "vite.config.ts",
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: rules.ts
    }
  ]
}
