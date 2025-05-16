import { List, Placeholder, SegmentedControl } from '@telegram-apps/telegram-ui'

export function SegmentsSkeleton() {
    return (
        <List>
            <Placeholder className={'p-0!'}>
                <SegmentedControl>
                    {Array.from({ length: 2 }, (_, index) => (
                        <SegmentedControl.Item
                            key={index}
                            selected={index === 0}
                        />
                    ))}
                </SegmentedControl>
            </Placeholder>
        </List>
    )
}
