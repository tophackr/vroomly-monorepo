import { Multiselectable, Section } from 'tmaui'
import {
    CellSkeleton,
    PulseSkeletonLayout,
    SectionHeaderSkeleton
} from '@/shared/ui/skeleton'

export function SelectableSkeleton() {
    return (
        <PulseSkeletonLayout>
            <Section header={<SectionHeaderSkeleton />}>
                {Array.from({ length: 3 }, (_, index) => (
                    <CellSkeleton
                        key={index}
                        before={
                            <Multiselectable
                                defaultChecked
                                disabled
                            />
                        }
                        short
                    />
                ))}
            </Section>
        </PulseSkeletonLayout>
    )
}
