import type { JSX, ReactNode } from 'react'
import { memo } from 'react'
import {
    Button,
    InlineButtons,
    List,
    Placeholder
} from '@telegram-apps/telegram-ui'
import { hasReactNode } from '@/shared/lib/dom'
import {
    AvatarSkeleton,
    PulseSkeletonLayout,
    TextSkeleton
} from '@/shared/ui/skeleton'

interface CarPreviewSkeletonProps {
    segments?: ReactNode
}

export const CarPreviewSkeleton = memo(function CarPreviewSkeleton({
    segments
}: CarPreviewSkeletonProps): JSX.Element {
    return (
        <PulseSkeletonLayout>
            {hasReactNode(segments) && segments}

            <Placeholder
                header={<TextSkeleton className={'bg-content m-auto'} />}
                description={
                    <TextSkeleton
                        className={'bg-hint m-auto'}
                        long
                    />
                }
            >
                <AvatarSkeleton size={96} />
            </Placeholder>

            <List>
                <InlineButtons
                    mode={'bezeled'}
                    className={'grid! grid-cols-3'}
                >
                    <Button
                        mode={'bezeled'}
                        className={'col-span-full'}
                    />

                    <>
                        {Array.from({ length: 6 }, (_, i) => (
                            <InlineButtons.Item key={i} />
                        ))}
                    </>
                </InlineButtons>
            </List>
        </PulseSkeletonLayout>
    )
})
