import type { JSX } from 'react'
import { List, Section } from '@telegram-apps/telegram-ui'
import {
    CellSkeleton,
    IconSkeleton,
    PulseSkeletonLayout,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function FormSkeleton(): JSX.Element {
    return (
        <List>
            <PulseSkeletonLayout>
                <Section>
                    <CellSkeleton before={<IconSkeleton />} />
                </Section>

                <Section header={<TextSkeleton className={'mt-4 mb-2'} />}>
                    {Array.from({ length: 4 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                        />
                    ))}
                </Section>

                <Section header={<TextSkeleton className={'mt-4 mb-2'} />}>
                    {Array.from({ length: 2 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                        />
                    ))}
                </Section>

                <Section header={<TextSkeleton className={'mt-4 mb-2'} />}>
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
