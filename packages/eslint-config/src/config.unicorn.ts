/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import pluginUnicorn from 'eslint-plugin-unicorn'
import { defineConfig } from './defineConfig.js'

/**
 * sindresorhus предоставляет ESLint правила.
 */
export const unicorn = defineConfig(({ files }) => [
    {
        files,
        plugins: { unicorn: pluginUnicorn },
        rules: {
            ...pluginUnicorn.configs.recommended.rules,
            'unicorn/no-nested-ternary': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-null': 'off',
            'unicorn/filename-case': [
                'error',
                {
                    case: 'camelCase',
                    ignore: [
                        '^[A-Z][a-zA-Z0-9]+\\.tsx$',
                        '^use[A-Z][a-zA-Z0-9]+\\.ts$'
                    ]
                }
            ]
        }
    }
])
