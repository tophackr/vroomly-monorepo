import type { PropsWithChildren } from 'react'
import { memo, useMemo, createContext, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useLogger } from '@/shared/model'
import { useFindOneCarQuery } from '../api/car.api'
import { CarPreviewSkeleton } from '../ui/CarPreviewSkeleton'
import type { CarIdProps, CarProps } from './props'

const Context = createContext<CarProps | null>(null)

export function useCarContext(): CarProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Car Context cannot be used out of context.')
    }

    return context
}

export const CarProvider = memo(function CarProvider({
    children,
    carId
}: PropsWithChildren<CarIdProps>) {
    const navigate = useNavigate()
    const { error: logError } = useLogger()

    const {
        data: car,
        isLoading,
        isError,
        error
    } = useFindOneCarQuery({ carId })

    useEffect(() => {
        if (!isLoading && !car) {
            void navigate('/not-found')
        }
    }, [car, isLoading, navigate])

    const value = useMemo(() => ({ car }), [car])

    if (isError) logError('CarContextProvider.carError', error)

    if (isLoading) return <CarPreviewSkeleton />

    if (!value.car) return null

    return <Context value={value as CarProps}>{children}</Context>
})
