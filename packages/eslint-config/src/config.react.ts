import type { Rules } from '@vroomly/eslint-plugin-server-only'
import serverOnly from '@vroomly/eslint-plugin-server-only'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactHooksExtra from 'eslint-plugin-react-hooks-extra'
import react from 'eslint-plugin-react-x'
import { defineConfig } from './defineConfig.js'

/**
 * Next.js関連の設定。
 */
export const reactEslint = defineConfig([
    {
        ...reactDom.configs.recommended,
        ...react.configs['recommended-typescript'],
        ...reactHooksExtra.configs.recommended,
        plugins: {
            'react-hooks': reactHooks,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            'react-dom': reactDom,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            'react-x': react,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            'react-hooks-extra': reactHooksExtra
        },
        rules: {
            ...reactDom.configs.recommended.rules,
            ...react.configs['recommended-typescript'].rules,
            ...reactHooksExtra.configs.recommended.rules,
            ...reactHooks.configs['recommended-latest'].rules,
            'react-x/no-use-context': 'off'
        }
    },
    {
        plugins: {
            'server-only': serverOnly
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        rules: {
            'server-only/place-import-server-only-top': 'warn'
        } satisfies Rules
    }
])
