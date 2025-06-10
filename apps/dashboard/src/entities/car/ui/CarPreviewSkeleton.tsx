import type { JSX } from 'react'
import { Button, InlineButtons, List, Placeholder } from 'tmaui'
import {
    AvatarSkeleton,
    PulseSkeletonLayout,
    TabsSkeleton,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function CarPreviewSkeleton(): JSX.Element {
    return (
        <PulseSkeletonLayout>
            <TabsSkeleton />

            <Placeholder
                header={<TextSkeleton className='bg-content m-auto h-8' />}
                description={
                    <TextSkeleton
                        className='bg-hint m-auto'
                        long
                    />
                }
            >
                <AvatarSkeleton size={96} />
            </Placeholder>

            <List>
                <InlineButtons
                    mode='bezeled'
                    className='grid! grid-cols-3'
                >
                    <Button
                        mode='bezeled'
                        className='col-span-full'
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
}
