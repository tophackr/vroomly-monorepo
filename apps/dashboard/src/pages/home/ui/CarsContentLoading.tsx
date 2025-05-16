import type { JSX } from 'react'
import {
    AvatarSkeleton,
    CellSkeleton,
    PulseSkeletonLayout
} from '@/shared/ui/skeleton'

export function CarsContentLoading(): JSX.Element {
    return (
        <PulseSkeletonLayout>
            {Array.from({ length: 5 }, (_, index) => (
                <CellSkeleton
                    key={index}
                    before={<AvatarSkeleton size={28} />}
                />
            ))}
        </PulseSkeletonLayout>
    )
}
