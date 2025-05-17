import { List, Section } from '@telegram-apps/telegram-ui'
import { CellSkeleton, PulseSkeletonLayout } from '@/shared/ui/skeleton'

export function RepairsSkeleton() {
    return (
        <PulseSkeletonLayout>
            <List>
                {Array.from({ length: 6 }, (_, index) => (
                    <Section key={index}>
                        <CellSkeleton />
                    </Section>
                ))}
            </List>
        </PulseSkeletonLayout>
    )
}
