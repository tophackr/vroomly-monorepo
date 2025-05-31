import type { PropsWithChildren } from 'react'
import { memo, useMemo, createContext, useContext } from 'react'
import {
    isMileageType,
    useFindAllInteractionsQuery
} from '@/entities/interaction/@x/car'
import { useLogger } from '@/shared/model'
import { useCarContext } from './CarContextProvider'
import type { CarMileageProps } from './props'

const Context = createContext<CarMileageProps | null>(null)

export function useMileageContext(): CarMileageProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Mileage Provider cannot be used out of context.')
    }

    return context
}

export const MileageProvider = memo(function CarContextProvider({
    children
}: PropsWithChildren) {
    const { car } = useCarContext()
    const { error: logError } = useLogger()

    const { data, isError, error } = useFindAllInteractionsQuery({
        carId: car.id
    })

    if (isError) logError('CarContextProvider.interactionError', error)

    const lastMileage = data?.find(({ type }) => isMileageType(type))

    const value = useMemo(
        () => ({
            mileage:
                lastMileage && lastMileage.mileage
                    ? lastMileage.mileage
                    : car.mileage
        }),
        [car.mileage, lastMileage]
    )

    return <Context value={value}>{children}</Context>
})
