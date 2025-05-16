'use client'

import type { JSX } from 'react'
import { memo, use } from 'react'
import { useCarContext } from '@/entities/car'
import type { CategoryProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'

export const CategoryPage = memo(function CategoryPage({
    params
}: ParamsProps<CategoryProps>): JSX.Element {
    const { category } = use(params)
    const { car } = useCarContext()

    return (
        <h1>
            Просмотр {category}, ID: для автомобиля {car.id}
        </h1>
    )
})
