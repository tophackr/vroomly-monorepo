import type { JSX } from 'react'
import { List, Section } from '@telegram-apps/telegram-ui'
import {
    CellSkeleton,
    IconSkeleton,
    PulseSkeletonLayout,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function InteractionFormSkeleton(): JSX.Element {
    return (
        <List>
            <PulseSkeletonLayout>
                <Section header={<TextSkeleton className={'mb-2'} />}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                        />
                    ))}
                </Section>
            </PulseSkeletonLayout>
        </List>
    )
}
