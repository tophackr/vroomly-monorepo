import pluginTypescript from '@typescript-eslint/eslint-plugin'
// eslint-disable-next-line import/default
import typescriptEslintParser from '@typescript-eslint/parser'
import { defineConfig } from './defineConfig.js'

export const typescript = defineConfig([
    {
        languageOptions: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
            parser: typescriptEslintParser as any,
            parserOptions: {
                project: true,
                sourceType: 'module'
            }
        },
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
            '@typescript-eslint': pluginTypescript as any
        },
        rules: {
            ...pluginTypescript?.configs?.['recommended']?.rules,
            ...pluginTypescript?.configs?.['recommended-type-checked']?.rules,
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',

                { prefer: 'type-imports' }
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['camelCase']
                },
                {
                    selector: 'variable',
                    modifiers: ['const'],
                    filter: {
                        regex: '^__.*',
                        match: true
                    },
                    // eslint-disable-next-line unicorn/no-null
                    format: null
                },
                {
                    selector: 'variable',
                    format: [
                        'camelCase',
                        'PascalCase' // React.FunctionComponent =
                    ]
                },
                {
                    selector: 'parameter',
                    filter: {
                        regex: '^_.*',
                        match: true
                    },
                    // eslint-disable-next-line unicorn/no-null
                    format: null
                },
                {
                    selector: 'parameter',
                    format: ['camelCase']
                },
                {
                    selector: 'memberLike',
                    format: ['camelCase', 'PascalCase']
                },
                {
                    selector: 'function',
                    format: [
                        'camelCase',
                        'PascalCase' // React.FunctionComponent =
                    ]
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase']
                },
                {
                    selector: 'enum',
                    format: ['PascalCase']
                },
                {
                    selector: 'enumMember',
                    format: ['snake_case']
                },
                {
                    selector: [
                        'classProperty',
                        'objectLiteralProperty',
                        'typeProperty',
                        'classMethod',
                        'objectLiteralMethod',
                        'typeMethod',
                        'accessor',
                        'enumMember'
                    ],
                    // eslint-disable-next-line unicorn/no-null
                    format: null,
                    modifiers: ['requiresQuotes']
                },
                {
                    selector: 'import',
                    format: ['camelCase', 'PascalCase']
                }
            ]
        }
    }
])
