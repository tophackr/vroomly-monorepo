import type { ESLint, Linter } from 'eslint'
import * as placeImportServerOnlyTop from './rules.placeImportServerOnlyTop.js'

const plugin = {
    rules: {
        [placeImportServerOnlyTop.name]: placeImportServerOnlyTop.rule
    }
} as const satisfies ESLint.Plugin

// eslint-disable-next-line import/no-default-export
export default plugin

export type Rules = Record<
    `server-only/${keyof typeof plugin.rules}`,
    Linter.RuleLevel
>
