import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts', 'supabase/.temp/**']),
  // Formatting through ESLint: `npm run lint -- --fix`, and Zed fixes on save.
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    arrowParens: true,
    braceStyle: '1tbs',
    commaDangle: 'always-multiline',
  }),
  {
    rules: {
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/no-extra-semi': 'error',
      'react/self-closing-comp': 'error',
    },
  },
]);

export default eslintConfig;
