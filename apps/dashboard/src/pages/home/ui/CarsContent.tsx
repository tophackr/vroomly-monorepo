'use client'

import type { JSX } from 'react'
import { useCallback, useState } from 'react'
import type { Car } from '@vroomly/prisma'
import type { SearchForm } from '@/features/search'
import { SearchPage } from '@/features/search'
import { CarCell, useFindAllCarsQuery } from '@/entities/car'
import { useLogger } from '@/shared/model'

export function CarsContent(): JSX.Element {
    const { error: logError } = useLogger()

    const { data: cars, isLoading, isError, error } = useFindAllCarsQuery()

    if (isError) logError('CarsContent', error)

    const [searchValue, setSearchValue] = useState('')

    const onFilter = useCallback(
        ({ brand, model }: Car) => {
            const trimmedValue = searchValue.trim()

            if (!trimmedValue) return true

            const lowerValue = trimmedValue.toLowerCase()

            const carArr = [brand]

            if (model) carArr.push(model)

            const carName = carArr.join(' ').toLowerCase()

            return carName.includes(lowerValue)
        },
        [searchValue]
    )

    const onSearch = useCallback(
        ({ value }: SearchForm) => setSearchValue(value),
        []
    )

    return (
        <SearchPage
            items={cars}
            render={items =>
                items?.map(car => (
                    <CarCell
                        key={car.id}
                        car={car}
                    />
                ))
            }
            isLoading={isLoading}
            onFilter={onFilter}
            onSearch={onSearch}
        />
    )
}
