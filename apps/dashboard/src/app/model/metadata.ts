import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/config'

export const AppMetadata: Metadata = {
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`
    },
    description: SITE_DESCRIPTION
}
