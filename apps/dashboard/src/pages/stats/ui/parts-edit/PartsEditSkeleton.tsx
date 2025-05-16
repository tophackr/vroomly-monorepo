import { Cell, List, Section, Switch } from '@telegram-apps/telegram-ui'
import { cx } from '@/shared/lib/dom'
import { PulseSkeletonLayout, TextSkeleton } from '@/shared/ui/skeleton'

export function PartsEditSkeleton() {
    return (
        <PulseSkeletonLayout>
            <List>
                {Array.from({ length: 4 }, (_, index) => (
                    <Section key={index}>
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
                                        'bg-content',
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
