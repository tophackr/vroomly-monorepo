import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/shared/config'

export const NotFoundMetadata: Metadata = {
    title: 'Page not found',
    ...NO_INDEX_PAGE
}
