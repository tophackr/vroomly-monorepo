import type { Linter } from 'eslint'
import { browser } from './config.browser.js'
import { eslint } from './config.eslint.js'
import { fsd } from './config.fsd.js'
import { imports } from './config.import.js'
import { comment } from './config.noCommentedCode.js'
import { node } from './config.node.js'
import { onlyWarn } from './config.onlyWarn.js'
import { prettierThisMustBePutLast } from './config.prettier.js'
import { reactEslint } from './config.react.js'
import { typescript } from './config.typescript.js'
import { unicorn } from './config.unicorn.js'
import { inferPackageTypes } from './inferPackageTypes.js'
import { unignore } from './unignores.js'

const rootFiles = ['*.js', '*.cjs', '*.mjs']
const { browserPackages, nodePackages } = await inferPackageTypes([
    'apps',
    'packages'
])
const browserFiles = browserPackages.map(dir => `${dir}/**/*.{ts,tsx}`)
const nodeFiles = nodePackages.map(dir => `${dir}/**/*.ts`)
const allFiles = [...rootFiles, ...browserFiles, ...nodeFiles]

// eslint-disable-next-line import/no-default-export
export default [
    {
        ignores: [
            // TypeScriptでの開発を基本とするプロジェクトでは、生成物であるJavaScriptファイルを検査
            // する必要がありません。そのため、生成物はあらかじめ検査対象からは除外しておきます。
            '**/*.{js,cjs,mjs,jsx}',
            '**/*.d.ts',
            // Next.jsが生成するファイルを検査対象から除外します。
            'apps/*/.next',
            // プロジェクトルート直下のJavaScriptファイルは検査対象に含めます。
            // これにはeslint.config.js自身も含まれます。
            ...unignore(rootFiles)
        ]
    },
    ...browser({ files: [...browserFiles] }),
    ...node({ files: [...rootFiles, ...nodeFiles] }),
    ...eslint({ files: allFiles }),
    ...typescript({ files: allFiles }),
    ...imports({ files: allFiles }),
    ...unicorn({ files: allFiles }),
    ...comment({ files: allFiles }),
    ...reactEslint({ files: browserFiles }),
    ...fsd({ files: browserFiles }),
    ...onlyWarn(),
    ...prettierThisMustBePutLast()
] satisfies Linter.FlatConfig[]
