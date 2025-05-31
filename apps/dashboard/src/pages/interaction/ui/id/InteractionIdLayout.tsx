import { Outlet, useParams } from 'react-router'
import { InteractionContextProvider } from '@/entities/interaction'

export function InteractionIdLayout() {
    const { carId, interactionId } = useParams<{
        carId: string
        interactionId: string
    }>()

    if (!carId || !interactionId) {
        throw new Error(
            'InteractionIdLayout requires carId and interactionId parameters.'
        )
    }

    return (
        <InteractionContextProvider
            carId={carId}
            interactionId={interactionId}
        >
            <Outlet />
        </InteractionContextProvider>
    )
}
