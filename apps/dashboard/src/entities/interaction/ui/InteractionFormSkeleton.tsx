import type { JSX } from 'react'
import { Cell, List, Section } from '@telegram-apps/telegram-ui'
import {
    CellSkeleton,
    IconSkeleton,
    PulseSkeletonLayout,
    SectionHeaderSkeleton
} from '@/shared/ui/skeleton'

export function InteractionFormSkeleton(): JSX.Element {
    return (
        <PulseSkeletonLayout>
            <List>
                <Section header={<SectionHeaderSkeleton large />}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>

                <Section>
                    <Cell className={'h-20'} />
                    <CellSkeleton
                        before={<IconSkeleton />}
                        short
                    />
                </Section>
            </List>
        </PulseSkeletonLayout>
    )
}
