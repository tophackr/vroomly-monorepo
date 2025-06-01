import messagesProcessor from '@feature-sliced/eslint-plugin-messages'
import pluginBoundaries from 'eslint-plugin-boundaries'
import { defineConfig } from './defineConfig.js'

const Layers = [
    'app',
    'pages',
    'widgets',
    'features',
    'entities',
    'shared'
] as const
const getLowerLayers = (layer: (typeof Layers)[number]) =>
    Layers.slice(Layers.indexOf(layer) + 1)

export const fsd = defineConfig(({ files }) => [
    {
        files,
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            boundaries: pluginBoundaries,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            '@feature-sliced/messages': messagesProcessor
        },
        processor: '@feature-sliced/messages/fs',
        settings: {
            'boundaries/elements': [
                {
                    type: 'cross_entities',
                    pattern: 'entities/*/@x/**'
                },
                ...Layers.map(layer => ({
                    type: layer,
                    pattern: `${layer}/*`
                }))
            ],
            'boundaries/ignore': ['**/*.test.*']
        },
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: Layers.flatMap(layer => {
                        // todo: fix entities layer public api
                        if (layer === 'entities')
                            return [
                                {
                                    message:
                                        'Private imports from entities are prohibited. Use public API or @x exceptions.',
                                    group: ['^@/entities/(?![^/]+/@x/).*']
                                },
                                {
                                    message:
                                        'Prefer absolute imports instead of relatives (for root modules).',
                                    group: [`../**/entities`]
                                }
                            ]

                        const isApp = layer === 'app'
                        const isShared = layer === 'shared'
                        const group = [
                            `@/${layer}/*${isApp ? '*' : isShared ? '/*/**' : '/**'}`
                        ]
                        return [
                            {
                                message:
                                    'Private imports are prohibited, use public imports instead.',
                                group
                            },
                            {
                                message:
                                    'Prefer absolute imports instead of relatives (for root modules).',
                                group: [`../**/${layer}`]
                            }
                        ]
                    })
                }
            ],
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    message:
                        '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
                    rules: [
                        ...Layers.map(layer => ({
                            from: layer,
                            allow: getLowerLayers(layer)
                        })),
                        {
                            from: 'entities',
                            allow: 'cross_entities'
                        },
                        {
                            from: 'shared',
                            allow: 'shared'
                        },
                        {
                            from: 'app',
                            allow: 'app'
                        }
                    ]
                }
            ]
        },
        ignores: ['packages/**']
    },
    {
        files: ['**/*.test.{js,jsx,ts,tsx}'],
        rules: {
            'boundaries/element-types': 'off'
        }
    }
])
