import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  { ...js.configs.recommended, files: ['src/**/*.{ts,tsx}'] },
  ...nextVitals,
  ...nextTypescript,
  { ...unicorn.configs.recommended, files: ['src/**/*.{ts,tsx}'] },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@/components/*/*',
            '@/config/*',
            '@/constants/*',
            '@/context/*',
            '@/hooks/*',
            '@/lib/*',
            '@/types/*',
            '@/utils/*',
            '../*',
          ],
          paths: ['react-i18next', 'next/router'],
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-danger': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // Renamed in Unicorn 77; retain the existing abbreviation convention.
      'unicorn/name-replacements': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['App'],
        },
      ],
      'unicorn/no-null': 'off',
    },
  },
])
