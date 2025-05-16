import type { JSX } from 'react'
import { InlineButtons } from '@telegram-apps/telegram-ui'
import { ActionBlock } from './ActionBlock'
import { MileageButton } from './mileage/MileageButton'

export function ButtonBlock(): JSX.Element {
    return (
        <InlineButtons
            mode={'bezeled'}
            className={'grid! grid-cols-3'}
        >
            <MileageButton />

            <ActionBlock />
        </InlineButtons>
    )
}
