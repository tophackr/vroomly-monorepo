import type { JSX } from 'react'
import { useNavigate } from 'react-router'
import { useCarContext } from '@/entities/car'
import { ActionButton } from './ActionButton'
import { ActionModal } from './ActionModal'
import { getActionButtons } from './getActionButtons'

export function ActionBlock(): JSX.Element[] {
    const { car } = useCarContext()
    const navigate = useNavigate()

    const buttons = getActionButtons(car.id)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return buttons.map(Button =>
        'Content' in Button ? (
            <ActionModal
                key={Button.name}
                trigger={
                    <ActionButton
                        name={Button.name}
                        icon={Button.icon}
                    />
                }
            >
                <Button.Content id={car.id} />
            </ActionModal>
        ) : (
            <ActionButton
                key={Button.name}
                name={Button.name}
                icon={Button.icon}
                onClick={() => navigate(Button.link)}
            />
        )
    )
}
