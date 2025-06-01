import type { JSX } from 'react'
import { List, Section } from 'tmaui'
import {
    CellSkeleton,
    IconSkeleton,
    PulseSkeletonLayout,
    SectionHeaderSkeleton
} from '@/shared/ui/skeleton'

export function FormSkeleton(): JSX.Element {
    return (
        <List>
            <PulseSkeletonLayout>
                <Section>
                    <CellSkeleton
                        before={<IconSkeleton />}
                        short
                    />
                </Section>

                <Section header={<SectionHeaderSkeleton />}>
                    {Array.from({ length: 4 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>

                <Section header={<SectionHeaderSkeleton />}>
                    {Array.from({ length: 2 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>

                <Section header={<SectionHeaderSkeleton />}>
                    {Array.from({ length: 3 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>
            </PulseSkeletonLayout>
        </List>
    )
}
