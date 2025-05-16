import { List, Section } from '@telegram-apps/telegram-ui'
import { SegmentsSkeleton } from '@/features/segment'
import { CellSkeleton, PulseSkeletonLayout } from '@/shared/ui/skeleton'

export function CostSkeleton() {
    return (
        <PulseSkeletonLayout>
            <SegmentsSkeleton />

            <List>
                {Array.from({ length: 4 }, (_, index) => (
                    <Section key={index}>
                        <CellSkeleton />
                    </Section>
                ))}
            </List>
        </PulseSkeletonLayout>
    )
}
