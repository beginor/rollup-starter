import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import * as rules  from './eslint.rules.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: rules.ts,
  },
);
