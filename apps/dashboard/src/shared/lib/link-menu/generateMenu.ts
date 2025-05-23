import type {
    MessageKeysTranslationClient,
    NestedMessages,
    NestedTranslationClient
} from '@/shared/i18n'
import type { IMenu, KeyMenu } from './types'

export function generateMenu<T extends NestedMessages, K>(
    route: (name: K) => string,
    t: NestedTranslationClient<T>,
    data: KeyMenu<MessageKeysTranslationClient<T>>[]
): IMenu[] {
    return data.map(item => ({
        ...item,
        href: route(item.name as K),
        // todo: remove this functional
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        name: t(item.name)
    }))
}
