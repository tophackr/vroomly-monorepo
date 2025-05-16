import nextPlugin from '@next/eslint-plugin-next'
import type { Rules } from '@vroomly/eslint-plugin-server-only'
import serverOnly from '@vroomly/eslint-plugin-server-only'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from './defineConfig.js'

/**
 * Next.js関連の設定。
 */
export const next = defineConfig(({ files }) => [
    {
        files,
        plugins: {
            'react-hooks': reactHooks,
            react
        },
        rules: {
            ...reactHooks.configs['recommended-latest'].rules,
            ...react.configs.recommended.rules,
            'react/prop-types': 'off'
        },
        settings: {
            react: { version: 'detect' }
        }
    },
    {
        files,
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            '@next/next': nextPlugin
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        rules: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...nextPlugin.configs.recommended.rules,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...nextPlugin.configs['core-web-vitals'].rules,
            '@next/next/no-html-link-for-pages': 'off'
        },
        ignores: ['packages/**']
    },
    {
        files: ['page', 'layout', 'not-found'].map(
            path => `**/app/**/${path}.tsx`
        ),
        rules: {
            // Next.jsの規約に従う部分については、default exportを許可する。
            'import/no-default-export': 'off'
        }
    },
    {
        files,
        plugins: {
            'server-only': serverOnly
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        rules: {
            'server-only/place-import-server-only-top': 'warn'
        } satisfies Rules
    }
])
