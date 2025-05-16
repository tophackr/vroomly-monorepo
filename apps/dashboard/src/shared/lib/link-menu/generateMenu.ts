import type {
    MessageKeysTranslationClient,
    NestedTranslationClient,
    Translation
} from '@/shared/i18n'
import type { IMenu, KeyMenu } from './types'

export function generateMenu<T extends keyof Translation, K>(
    route: (name: K) => string,
    t: NestedTranslationClient<T>,
    data: KeyMenu<MessageKeysTranslationClient<T>>[]
): IMenu[] {
    return data.map(item => ({
        ...item,
        href: route(item.name as K),
        name: t(item.name)
    }))
}
