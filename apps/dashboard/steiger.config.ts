import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, import/no-default-export
export default defineConfig([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...fsd.configs.recommended,
    {
        rules: {
            'fsd/insignificant-slice': 'warn'
        }
    },
    {
        files: ['./src/entities/**'],
        rules: {
            'fsd/forbidden-imports': 'off'
        }
    }
])
