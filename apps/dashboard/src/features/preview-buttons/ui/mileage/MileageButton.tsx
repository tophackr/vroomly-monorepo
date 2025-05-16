import type { JSX } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@telegram-apps/telegram-ui'
import { InteractionCategory } from '@vroomly/prisma'
import { useCarContext } from '@/entities/car'
import { actionsRoute } from '@/entities/interaction'
import { useButtonClick } from '@/shared/lib/dom'

export function MileageButton(): JSX.Element {
    const t = useTranslations('CarActionButtons')
    const { car } = useCarContext()

    const props = useButtonClick({
        route: actionsRoute(car.id).new(InteractionCategory.mileage)
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
