import { List, Placeholder, Section } from '@telegram-apps/telegram-ui'
import {
    CellSkeleton,
    PulseSkeletonLayout,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function ListSkeleton() {
    return (
        <PulseSkeletonLayout>
            <Placeholder
                header={<TextSkeleton className={'bg-content m-auto'} />}
                description={
                    <TextSkeleton
                        className={'bg-hint m-auto'}
                        long
                    />
                }
            />

            <List>
                <Section
                    header={<TextSkeleton className={'bg-content mb-2'} />}
                    footer={<TextSkeleton className={'bg-subtitle'} />}
                >
                    {Array.from({ length: 3 }, (_, index) => (
                        <CellSkeleton key={index} />
                    ))}
                </Section>

                <Section
                    header={<TextSkeleton className={'bg-content mb-2'} />}
                    footer={<TextSkeleton className={'bg-subtitle'} />}
                >
                    {Array.from({ length: 2 }, (_, index) => (
                        <CellSkeleton key={index} />
                    ))}
                </Section>
            </List>
        </PulseSkeletonLayout>
    )
}
