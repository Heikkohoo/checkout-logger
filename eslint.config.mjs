import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';


export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            functional,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },

            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',

            parserOptions: {
                project: './tsconfig.json',
            },
        },

        rules: {
            '@typescript-eslint/no-explicit-any': ['off'],
            '@typescript-eslint/interface-name-prefix': ['off'],
            '@typescript-eslint/no-unsafe-member-access': ['off'],
            '@typescript-eslint/no-unsafe-assignment': ['off'],
            '@typescript-eslint/no-unsafe-call': ['off'],
            '@typescript-eslint/no-unsafe-return': ['off'],
            'functional/no-let': 'error',
            'functional/no-return-void': 'error',
            'functional/no-loop-statements': 'error',
            eqeqeq: 'error',
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'linebreak-style': ['error', 'unix'],
            'max-len': ['error', {
                code: 120,
            }],
            '@typescript-eslint/explicit-function-return-type': 'error',
            'functional/immutable-data': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/triple-slash-reference': 'error',
        },
    }
);