'use client'

import type { JSX } from 'react'
import { memo, use } from 'react'
import { useCarContext } from '@/entities/car'
import type { InteractionTypeProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'

export const CategoryPage = memo(function CategoryPage({
    params
}: ParamsProps<InteractionTypeProps>): JSX.Element {
    const { type } = use(params)
    const { car } = useCarContext()

    return (
        <h1>
            Просмотр {type}, ID: для автомобиля {car.id}
        </h1>
    )
})
