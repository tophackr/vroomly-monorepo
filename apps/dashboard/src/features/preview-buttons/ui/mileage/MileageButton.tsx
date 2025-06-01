'use client'

import type { JSX } from 'react'
import { InteractionType } from '@vroomly/prisma'
import { Button } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import { actionsRoute } from '@/entities/interaction'
import { useButtonClick } from '@/shared/lib/dom'

export function MileageButton(): JSX.Element {
    const t = useTranslations('CarActionButtons')
    const { car } = useCarContext()

    const props = useButtonClick({
        route: actionsRoute(car.id).new(InteractionType.mileage)
    })

    return (
        <Button
            mode={'bezeled'}
            className={'col-span-full'}
            {...props}
        >
            {t('add')}
        </Button>
    )
}
