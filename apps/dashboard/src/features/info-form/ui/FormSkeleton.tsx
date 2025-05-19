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
                    <CellSkeleton
                        before={<IconSkeleton />}
                        short
                    />
                </Section>

                <Section
                    header={
                        <TextSkeleton
                            className={'bg-subtitle ms-4 mt-8 mb-2'}
                        />
                    }
                >
                    {Array.from({ length: 4 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>

                <Section
                    header={
                        <TextSkeleton
                            className={'bg-subtitle ms-4 mt-8 mb-2'}
                        />
                    }
                >
                    {Array.from({ length: 2 }, (_, index) => (
                        <CellSkeleton
                            key={index}
                            before={<IconSkeleton />}
                            short
                        />
                    ))}
                </Section>

                <Section
                    header={
                        <TextSkeleton
                            className={'bg-subtitle ms-4 mt-8 mb-2'}
                        />
                    }
                >
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
