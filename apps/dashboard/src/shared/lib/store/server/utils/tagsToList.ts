import type { ApiTags, TagDescription } from '../types'

interface TagsToListProps<T extends ApiTags, R extends { id: string }> {
    tag: T
    result?: R | R[] | undefined
    depsTags?: T[]
}

export function invalidatesTagsToList<
    T extends ApiTags,
    R extends { id: string }
>({ tag, result, depsTags }: TagsToListProps<T, R>): TagDescription<T>[] {
    let tagList: TagDescription<T>[] = [{ type: tag, id: 'LIST' }]

    if (depsTags) {
        tagList = [
            ...tagList,
            ...depsTags.map(tag => ({ type: tag, id: 'LIST' }))
        ]
    }
    if (!result) return tagList

    return Array.isArray(result)
        ? [...tagList, ...result.map(({ id }) => ({ type: tag, id }))]
        : [...tagList, { type: tag, id: result.id }]
}

export function providesTagsToList<
    T extends ApiTags,
    R extends { id: string }
>({ tag, result, depsTags }: TagsToListProps<T, R>): TagDescription<T>[] {
    if (!result) return []

    if (Array.isArray(result)) {
        let tagList: TagDescription<T>[] = [{ type: tag, id: 'LIST' }]

        if (depsTags) {
            tagList = [
                ...tagList,
                ...depsTags.map(tag => ({ type: tag, id: 'LIST' }))
            ]
        }

        return [...tagList, ...result.map(({ id }) => ({ type: tag, id }))]
    } else {
        return [{ type: tag, id: result.id }]
    }
}
