import { Section } from '@telegram-apps/telegram-ui'
import {
    CellSkeleton,
    PulseSkeletonLayout,
    SectionHeaderSkeleton
} from '@/shared/ui/skeleton'

export function SelectedSkeleton() {
    return (
        <PulseSkeletonLayout>
            <Section header={<SectionHeaderSkeleton />}>
                {Array.from({ length: 3 }, (_, index) => (
                    <CellSkeleton
                        key={index}
                        short
                    />
                ))}
            </Section>
        </PulseSkeletonLayout>
    )
}
