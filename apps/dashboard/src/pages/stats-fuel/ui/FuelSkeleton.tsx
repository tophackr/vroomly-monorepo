import { Cell, Placeholder } from '@telegram-apps/telegram-ui'
import { ListSection } from '@/shared/ui'
import { PulseSkeletonLayout, TextSkeleton } from '@/shared/ui/skeleton'

export function FuelSkeleton() {
    return (
        <ListSection>
            <PulseSkeletonLayout>
                <div className={'grid grid-cols-2 justify-around'}>
                    <TextSkeleton
                        className={'col-span-2 m-4 justify-self-center'}
                    />

                    {Array.from({ length: 2 }, (_, i) => (
                        <Placeholder
                            key={i}
                            header={<TextSkeleton className={'mx-auto'} />}
                            description={
                                <TextSkeleton
                                    className={'bg-hint justify-self-center'}
                                />
                            }
                            className={'py-0!'}
                        />
                    ))}

                    <TextSkeleton
                        className={
                            'text-caption1 bg-subtitle col-span-2 m-4 justify-self-center'
                        }
                        long
                    />
                </div>

                {Array.from({ length: 5 }, (_, i) => (
                    <Cell key={i}>
                        <TextSkeleton />
                    </Cell>
                ))}
            </PulseSkeletonLayout>
        </ListSection>
    )
}
