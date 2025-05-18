'use client'

import type { JSX } from 'react'
import { memo, useState } from 'react'
import { List, Placeholder, SegmentedControl } from '@telegram-apps/telegram-ui'
import type { SegmentProps } from './types'

export const Segments = memo(function Segments({
    segments,
    defaultSegment
}: SegmentProps): JSX.Element {
    const [segment, setSegment] = useState<string>(defaultSegment)

    const SegmentItem = segments.find(({ key }) => key === segment)

    return (
        <>
            <List>
                <Placeholder className={'p-0!'}>
                    <SegmentedControl>
                        {segments.map(({ key, label }) => (
                            <SegmentedControl.Item
                                key={key}
                                onClick={() => setSegment(key)}
                                selected={segment === key}
                                className={'px-0!'}
                            >
                                {label}
                            </SegmentedControl.Item>
                        ))}
                    </SegmentedControl>
                </Placeholder>
            </List>

            {SegmentItem?.Component}
        </>
    )
})
