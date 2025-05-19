import type { JSX } from 'react'
import { Input, Tappable } from '@telegram-apps/telegram-ui'
import { Icon } from '@/shared/ui/icon'
import {
    AvatarSkeleton,
    CellSkeleton,
    PulseSkeletonLayout
} from '@/shared/ui/skeleton'

export function CarsContentLoading(): JSX.Element {
    return (
        <PulseSkeletonLayout>
            <Input
                after={
                    <Tappable className={'flex'}>
                        <Icon
                            name={'X'}
                            className={'text-hint'}
                        />
                    </Tappable>
                }
                disabled
            />

            {Array.from({ length: 3 }, (_, index) => (
                <CellSkeleton
                    key={index}
                    before={<AvatarSkeleton size={28} />}
                />
            ))}
        </PulseSkeletonLayout>
    )
}
