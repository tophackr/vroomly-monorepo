import type { ReactNode } from 'react'

export interface SearchProps {
    onSearch: (data: SearchForm) => void
    debounceTime?: number
}

export interface SearchPageProps<T> extends SearchProps {
    items: T[] | undefined
    render: (filteredItems: T[] | undefined) => ReactNode
    isLoading: boolean
    onFilter: (item: T) => boolean | undefined
    nothing?: ReactNode
    nothingTitle?: ReactNode
    nothingDescription?: ReactNode
}

export interface SearchForm {
    value: string
}
