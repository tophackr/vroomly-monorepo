import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import type { ListProps, SectionProps } from '@telegram-apps/telegram-ui'
import { List, Section } from '@telegram-apps/telegram-ui'

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
