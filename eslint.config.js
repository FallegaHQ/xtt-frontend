import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files          : ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.serviceworker, ...globals.browser,
            },
        },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    promisePlugin.configs['flat/recommended'],
    nPlugin.configs['flat/recommended'],
    {
        'settings': {
            'node' : {
                'version': '>=22.13.1',
            },
            'react': {
                'version': 'detect',
                "pragma": "React",
            },
        },
        'rules'   : {
            'n/no-unsupported-features/node-builtins': [
                'error',
                {
                    ignores: [
                        'localStorage',
                    ],
                },
            ],
            'n/no-missing-import'                    : [
                'error',
                {
                    tryExtensions: [
                        '.ts',
                        '.tsx',
                    ],
                },
            ],
            'react/jsx-filename-extension'           : [
                1,
                {
                    'extensions': [
                        '.tsx',
                        '.ts',
                        '.jsx',
                        '.js',
                    ],
                },
            ],
            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    allowInterfaces: 'always',
                },
            ],
            '@typescript-eslint/no-unused-vars'      : [
                'warn',
                {
                    argsIgnorePattern        : '^_|^unused',
                    varsIgnorePattern        : '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
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
