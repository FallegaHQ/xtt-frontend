import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import standard from 'eslint-config-standard';

export default [
    js.configs.recommended,
    standard,
    {
        ignores: [
            "/*", "!/src"
        ], // Ignore everything outside src folder
    },
    {
        files          : [
            'src/**/*.ts',
            'src/**/*.tsx',
        ],
        languageOptions: {
            parser       : tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins        : {
            '@typescript-eslint': tseslint,
            'react-hooks'       : reactHooks,
            'react-refresh'     : reactRefresh,
            import              : importPlugin,
            n                   : nPlugin,
            promise             : promisePlugin,
        },
        rules          : {
            ...tseslint.configs.recommended.rules, ...tseslint.configs['recommended-requiring-type-checking'].rules, ...reactHooks.configs.recommended.rules, ...reactRefresh.configs.recommended.rules,
            'import/no-unresolved'                            : [
                'error',
                { ignore: ['^@/'] },
            ], // Allow unresolved imports for TypeScript path mappings
            'import/order'                                    : 'warn',
            'n/no-missing-import'                             : [
                'warn',
                {
                    tryExtensions: [
                        '.ts',
                        '.tsx',
                        '.js',
                        '.jsx',
                    ],
                },
            ], // Ensure imports are correctly resolved for TS/JS files
            'promise/always-return'                           : 'error',
            'promise/no-return-wrap'                          : 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars'               : [
                'warn',
                { argsIgnorePattern: '^_$|^unused' },
            ],
            'no-unused-vars'                                  : 'warn',
            "camelcase": [
                "error"
            ],
            "capitalized-comments": [
                "error"
            ],
            "constructor-super": [
                "error"
            ],
            "eol-last": [
                "error"
            ],
            "getter-return": [
                "error"
            ],
            "global-require": [
                "error"
            ],
            "jsx-quotes": [
                "error"
            ],
            "newline-before-return": [
                "error"
            ],
            "newline-per-chained-call": [
                "error"
            ],
        },
    },
];
