'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { List } from '@telegram-apps/telegram-ui'
import type {
    InteractionTypeProps,
    InteractionProps
} from '@/entities/interaction'
import {
    isFuelType,
    isPartType,
    isRepairType,
    isWheelType
} from '@/entities/interaction'
import { BaseSection } from './BaseSection'
import { DeleteInteractionButton } from './DeleteInteractionButton'
import { FuelSection } from './fuel/FuelSection'
import { InteractionFormProvider } from './InteractionFormProvider'
import { PartsSection } from './PartsSection'
import { RepairSection } from './RepairSection'
import { SaveActionButton } from './SaveActionButton'
import { WheelsSection } from './wheels/WheelsSection'

export const Form = memo(function Form({
    type,
    interaction
}: InteractionTypeProps & Partial<InteractionProps>): JSX.Element {
    const t = useTranslations('CarCategoryName')

    return (
        <List>
            <InteractionFormProvider
                type={type}
                {...(interaction ? { interaction } : {})}
            >
                <BaseSection title={t(type)} />

                {isFuelType(type) && <FuelSection />}

                {isRepairType(type) && <RepairSection />}

                {isPartType(type) && <PartsSection />}

                {isWheelType(type) && <WheelsSection />}

                <SaveActionButton />
            </InteractionFormProvider>

            {interaction && (
                <DeleteInteractionButton
                    carId={interaction.carId}
                    interactionId={interaction.id}
                />
            )}
        </List>
    )
})
