import type { PropsWithChildren } from 'react'
import { createContext, memo, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import type { CarIdProps } from '@/entities/car/@x/interaction'
import { useLogger } from '@/shared/model'
import { useFindOneInteractionQuery } from '../api/interaction.api'
import { InteractionFormSkeleton } from '../ui/InteractionFormSkeleton'
import type { InteractionIdProps, InteractionProps } from './props'

const Context = createContext<InteractionProps | null>(null)

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
        carId,
        interactionId
    }: PropsWithChildren<CarIdProps & InteractionIdProps>) {
        const navigate = useNavigate()
        const { error: logError } = useLogger()

        const {
            data: interaction,
            isLoading,
            isError,
            error
        } = useFindOneInteractionQuery({ carId, interactionId })

        useEffect(() => {
            if (!isLoading && !interaction) {
                void navigate('/not-found')
            }
        }, [interaction, isLoading, navigate])

        const value = useMemo(() => ({ interaction }), [interaction])

        if (isError) logError('InteractionContextProvider', error)

        if (isLoading) return <InteractionFormSkeleton />

        if (!value.interaction) return null

        return <Context value={value as InteractionProps}>{children}</Context>
    }
)
