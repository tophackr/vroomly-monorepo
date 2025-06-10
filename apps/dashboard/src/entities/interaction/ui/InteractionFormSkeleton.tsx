import type { JSX } from 'react'
import { Cell, List, Section } from 'tmaui'
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
                            className='my-[.375rem]'
                            short
                        />
                    ))}
                </Section>

                <Section>
                    <Cell className='h-20' />
                    <CellSkeleton
                        before={<IconSkeleton />}
                        className='my-[.375rem]'
                        short
                    />
                </Section>
            </List>
        </PulseSkeletonLayout>
    )
}
