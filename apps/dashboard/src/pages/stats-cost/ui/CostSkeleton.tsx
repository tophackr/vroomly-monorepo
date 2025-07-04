import { List, Section } from 'tmaui'
import {
    CellSkeleton,
    PulseSkeletonLayout,
    TabsSkeleton
} from '@/shared/ui/skeleton'

export function CostSkeleton() {
    return (
        <PulseSkeletonLayout>
            <TabsSkeleton />

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
