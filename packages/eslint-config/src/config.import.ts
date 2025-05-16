/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import pluginImport from 'eslint-plugin-i'
import { defineConfig } from './defineConfig.js'

export const imports = defineConfig([
    {
        plugins: {
            import: pluginImport
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        settings: {
            'import/parsers': {
                espree: ['.js', '.cjs', '.mjs', '.jsx']
            },
            'import/resolver': {
                typescript: {
                    bun: true,
                    project: [
                        './tsconfig.json',
                        './apps/*/tsconfig.json',
                        './packages/*/tsconfig.json'
                    ] //'./tsconfig.base.json'
                },
                node: true
            }
        },
        rules: {
            ...pluginImport.configs.recommended.rules,
            'import/no-anonymous-default-export': 'error',
            'import/no-default-export': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object'
                    ],
                    pathGroups: [
                        {
                            pattern: 'react**',
                            group: 'builtin',
                            position: 'before'
                        },
                        {
                            pattern: 'next**',
                            group: 'builtin',
                            position: 'before'
                        },
                        {
                            pattern: '@/public/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/app/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/pages/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/widgets/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/features/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/entities/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/shared/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/**',
                            group: 'parent',
                            position: 'before'
                        },
                        {
                            pattern: '**/*.scss',
                            group: 'index',
                            position: 'after'
                        }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: {
                        order: 'asc',
                        orderImportKind: 'asc',
                        caseInsensitive: true
                    },
                    warnOnUnassignedImports: false,
                    'newlines-between': 'never'
                }
            ]
        }
    }
])
