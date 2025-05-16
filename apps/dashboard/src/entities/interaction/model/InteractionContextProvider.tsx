'use client'

import type { JSX, PropsWithChildren } from 'react'
import { createContext, memo, use, useContext } from 'react'
import { InteractionCategory } from '@vroomly/prisma'
import { notFound } from 'next/navigation'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { useLogger } from '@/shared/model'
import { useFindOneInteractionQuery } from '../api/interaction.api'
import { InteractionFormSkeleton } from '../ui/InteractionFormSkeleton'
import type { InteractionIdProps, InteractionProps } from './props'

const Context = createContext<InteractionProps>({
    interaction: {
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        type: InteractionCategory.mileage,
        date: new Date(),
        mileage: 0,
        amount: null,
        description: '',
        engineHours: null,
        fuelInteraction: null,
        repairInteractions: [],
        partInteractions: [],
        wheelInteraction: null,
        carId: '',
        userId: ''
    }
})

export function useInteractionContext(): InteractionProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Interaction Context cannot be used out of context.')
    }

    return context
}

export const InteractionContextProvider = memo(
    function InteractionContextProvider({
        children,
        params
    }: PropsWithChildren<
        ParamsProps<CarIdProps & InteractionIdProps>
    >): JSX.Element {
        const { carId, interactionId } = use(params)
        const { error: logError } = useLogger()

        const {
            data: interaction,
            isLoading,
            isError,
            error
        } = useFindOneInteractionQuery({ carId, interactionId })

        if (isError) logError('InteractionContextProvider', error)

        if (isLoading) return <InteractionFormSkeleton />

        if (!interaction) {
            notFound()
        }

        return (
            <Context.Provider value={{ interaction }}>
                {children}
            </Context.Provider>
        )
    }
)
