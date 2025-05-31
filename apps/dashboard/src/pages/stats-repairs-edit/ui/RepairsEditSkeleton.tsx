import { Cell, List, Section, Switch } from 'tmaui'
import { cx } from '@/shared/lib/dom'
import {
    PulseSkeletonLayout,
    SectionHeaderSkeleton,
    TextSkeleton
} from '@/shared/ui/skeleton'

export function RepairsEditSkeleton() {
    return (
        <PulseSkeletonLayout>
            <List>
                {Array.from({ length: 3 }, (_, index) => (
                    <Section
                        header={
                            <SectionHeaderSkeleton
                                className={cx(index === 0 && 'mt-4')}
                            />
                        }
                        key={index}
                    >
                        {Array.from({ length: 3 }, (_, index) => (
                            <Cell
                                key={index}
                                after={
                                    index === 2 && (
                                        <Switch
                                            defaultChecked
                                            disabled
                                        />
                                    )
                                }
                            >
                                <TextSkeleton
                                    className={cx(
                                        'bg-content my-[.1875rem]',
                                        index === 2 && 'w-48'
                                    )}
                                />
                            </Cell>
                        ))}
                    </Section>
                ))}
            </List>
        </PulseSkeletonLayout>
    )
}
