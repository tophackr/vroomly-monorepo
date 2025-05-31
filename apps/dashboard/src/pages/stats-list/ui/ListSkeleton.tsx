import {
    LargeTitle,
    List,
    Placeholder,
    Section
} from 'tmaui'
import {
    CellSkeleton,
    PulseSkeletonLayout,
    SectionHeaderSkeleton,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function ListSkeleton() {
    return (
        <PulseSkeletonLayout>
            <Placeholder
                description={
                    <TextSkeleton
                        className={'bg-hint mt-2 mx-auto'}
                        long
                    />
                }
            >
                <LargeTitle>
                    <TextSkeleton className={'py-4 mt-4 mx-auto'} />
                </LargeTitle>
            </Placeholder>

            <List className={'-mt-2'}>
                <Section
                    header={<SectionHeaderSkeleton />}
                    footer={<TextSkeleton />}
                >
                    {Array.from({ length: 2 }, (_, index) => (
                        <CellSkeleton key={index} />
                    ))}
                </Section>

                <Section
                    header={<SectionHeaderSkeleton />}
                    footer={<TextSkeleton />}
                >
                    <CellSkeleton />
                </Section>
            </List>
        </PulseSkeletonLayout>
    )
}
