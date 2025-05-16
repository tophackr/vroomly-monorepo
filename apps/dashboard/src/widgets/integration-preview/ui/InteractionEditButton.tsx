import type { JSX } from 'react'
import { EditButton } from '@/entities/edit'
import { actionsRoute, useInteractionContext } from '@/entities/interaction'
import { useButtonClick } from '@/shared/lib/dom'

export function InteractionEditButton(): JSX.Element {
    const { interaction } = useInteractionContext()

    const props = useButtonClick({
        route: actionsRoute(interaction.carId).edit(
            interaction.type,
            interaction.id
        )
    })

    return <EditButton {...props} />
}
