'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo, use, useMemo, createContext, useContext } from 'react'
import { FuelType, OdometerUnits } from '@vroomly/prisma'
import { notFound } from 'next/navigation'
import {
    isMileageType,
    useFindAllInteractionsQuery
} from '@/entities/interaction/@x/car'
import type { ParamsProps } from '@/shared/lib/dom'
import { useLogger } from '@/shared/model'
import { useFindOneCarQuery } from '../api/car.api'
import { CarPreviewSkeleton } from '../ui/CarPreviewSkeleton'
import type { CarIdProps, CarMileageProps, CarProps } from './props'

const CarContext = createContext<CarProps & CarMileageProps>({
    car: {
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDefault: false,
        brand: '',
        model: null,
        name: null,
        year: null,
        fuelType: FuelType.gasoline,
        fuelCapacity: null,
        mileage: 0,
        odometerUnits: OdometerUnits.kilometer,
        engineHoursEnabled: false,
        engineHours: null,
        userId: ''
    },
    mileage: 0
})

export function useCarContext(): CarProps & CarMileageProps {
    const context = useContext(CarContext)

    if (!context) {
        throw new Error('Car Context cannot be used out of context.')
    }

    return context
}

export const CarContextProvider = memo(function CarContextProvider({
    children,
    params
}: PropsWithChildren<ParamsProps<CarIdProps>>): JSX.Element {
    const { carId } = use(params)
    const { error: logError } = useLogger()

    const {
        data: car,
        isLoading: isCarLoading,
        isSuccess: isCarSuccess,
        isError: isCarError,
        error: carError
    } = useFindOneCarQuery({ carId })

    const stableCarId = useMemo(() => ({ carId: car?.id ?? '' }), [car?.id])

    const {
        data: interactions,
        isFetching: isInteractionsFetching,
        isError: isInteractionError,
        error: interactionError
    } = useFindAllInteractionsQuery(stableCarId, {
        skip: !car?.id || (!isCarLoading && isCarSuccess && !isCarError)
    })

    if (isCarError) logError('CarContextProvider.carError', carError)
    if (isInteractionError)
        logError('CarContextProvider.interactionError', interactionError)

    if (isCarLoading) return <CarPreviewSkeleton />

    if (!car) {
        notFound()
    }

    if (isInteractionsFetching) return <CarPreviewSkeleton />

    const lastMileage = interactions?.find(({ type }) => isMileageType(type))

    const mileage =
        lastMileage && lastMileage.mileage ? lastMileage.mileage : car.mileage

    return (
        <CarContext.Provider value={{ car, mileage }}>
            {children}
        </CarContext.Provider>
    )
})
