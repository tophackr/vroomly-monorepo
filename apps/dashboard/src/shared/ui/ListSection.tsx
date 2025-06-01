import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import type { ListProps, SectionProps } from 'tmaui'
import { List, Section } from 'tmaui'

interface ListSectionProps {
    listProps?: ListProps
    sectionProps?: SectionProps
}

export const ListSection = memo(function ListSection({
    children,
    listProps,
    sectionProps
}: PropsWithChildren<ListSectionProps>): JSX.Element {
    return (
        <List {...listProps}>
            <Section {...sectionProps}>{children}</Section>
        </List>
    )
})
