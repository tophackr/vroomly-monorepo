import js from '@eslint/js'
import type { Linter } from 'eslint'
import turboConfig from 'eslint-config-turbo/flat'
import { defineConfig } from './defineConfig.js'

/**
 * ESLintビルトインのルール設定。
 */
export const eslint = defineConfig([
    ...(turboConfig as Linter.FlatConfig[]),
    js.configs.recommended,
    {
        rules: {
            'no-console': 'error', // consoleではなくloggerを使いましょう。
            'object-shorthand': ['error', 'always'],
            'prefer-destructuring': [
                'error',
                { VariableDeclarator: { object: true } },
                { enforceForRenamedProperties: false }
            ]
        }
    }
])
