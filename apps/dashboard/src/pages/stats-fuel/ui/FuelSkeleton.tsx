import { Cell, Placeholder } from 'tmaui'
import { ListSection } from '@/shared/ui'
import { PulseSkeletonLayout, TextSkeleton } from '@/shared/ui/skeleton'

export function FuelSkeleton() {
    return (
        <PulseSkeletonLayout>
            <ListSection>
                <div className='grid grid-cols-2 justify-around'>
                    <TextSkeleton className='col-span-2 m-4 justify-self-center' />

                    {Array.from({ length: 2 }, (_, i) => (
                        <Placeholder
                            key={i}
                            header={
                                <TextSkeleton className='mx-auto my-4 h-8' />
                            }
                            description={
                                <TextSkeleton className='bg-hint mx-auto' />
                            }
                            className='py-0!'
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
                        <TextSkeleton className='py-2 my-[.1875rem]' />
                    </Cell>
                ))}
            </ListSection>
        </PulseSkeletonLayout>
    )
}
