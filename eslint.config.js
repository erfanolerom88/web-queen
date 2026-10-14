import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';
import globals from 'globals';

const envGlobals = {
  ...globals.browser,
  ...globals.node
};

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    ignores: [
      '**/node_modules/**',
      '**/.svelte-kit/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**'
    ]
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    languageOptions: {
      globals: envGlobals
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: envGlobals,
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: ['.svelte']
      }
    }
  }
);
