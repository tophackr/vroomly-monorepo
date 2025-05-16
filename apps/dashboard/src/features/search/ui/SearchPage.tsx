'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { hasReactNode } from '@/shared/lib/dom'
import {
    LoadingPlaceholder,
    NotFoundPlaceholder,
    NothingPlaceholder
} from '@/shared/ui/placeholder'
import { Search } from './Search'
import type { SearchPageProps } from './types'

export function SearchPage<T>({
    items,
    render,
    isLoading,
    onFilter,
    nothing,
    nothingTitle,
    nothingDescription,
    ...props
}: SearchPageProps<T>): JSX.Element {
    const itemsFiltered = useMemo(
        () => items?.filter(onFilter),
        [items, onFilter]
    )

    return (
        <>
            <Search {...props} />

            {isLoading ? (
                <LoadingPlaceholder />
            ) : (
                <>
                    {items?.length ? (
                        itemsFiltered?.length ? (
                            <>{render(itemsFiltered)}</>
                        ) : (
                            <NotFoundPlaceholder />
                        )
                    ) : (
                        <>
                            {hasReactNode(nothing) ? (
                                <>{nothing}</>
                            ) : (
                                <NothingPlaceholder
                                    header={nothingTitle}
                                    description={nothingDescription}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}
