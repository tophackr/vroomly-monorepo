'use client'

import { useMessages } from 'use-intl'
import { useLogger } from '@/shared/model'
import type { Translation } from '../types'

type PathImpl<T, K extends keyof T> = K extends string
    ? T[K] extends object
        ? [K] | [K, ...PathImpl<T[K], keyof T[K]>]
        : [K]
    : never

type Path<T> = PathImpl<T, keyof T>

type ValueAtPath<T, P extends Path<T>> = P extends [infer K]
    ? K extends keyof T
        ? T[K]
        : never
    : P extends [infer K, ...infer R]
      ? K extends keyof T
          ? R extends Path<T[K]>
              ? ValueAtPath<T[K], R>
              : never
          : never
      : never

export function useMessagesKeys<P extends Path<Translation>>(
    ...path: P
): (keyof ValueAtPath<Translation, P>)[] {
    const { forceWarn, forceError } = useLogger()

    const messages = useMessages()

    let current: unknown = messages

    for (const key of path) {
        if (
            typeof current === 'object' &&
            current !== null &&
            key in (current as Record<string, unknown>)
        ) {
            current = (current as Record<string, unknown>)[key]
        } else {
            forceWarn(`Invalid path: ${path.join('.')}`)
            return []
        }
    }

    if (typeof current === 'object' && current !== null) {
        return Object.keys(current) as (keyof ValueAtPath<Translation, P>)[]
    }

    forceError(`Path does not resolve to an object: ${path.join('.')}`)
    return []
}
