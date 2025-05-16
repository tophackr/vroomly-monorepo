import globals from 'globals'
import { defineConfig } from './defineConfig.js'

/**
 * ブラウザー関連の設定。
 */
export const browser = defineConfig([
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                React: true,
                JSX: true
            }
        }
    }
])
