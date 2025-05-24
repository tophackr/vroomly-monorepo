'use client'

import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import { ActionButton } from './ActionButton'
import { ActionModal } from './ActionModal'
import { useActionButtons } from './hooks/useActionButtons'
import { ModalContent } from './ModalContent'

export function ActionBlock(): JSX.Element[] {
    const t = useTranslations('CarCategoryName')
    const { car } = useCarContext()
    const router = useRouter()

    const buttons = useActionButtons(car.id)

    return buttons.map(button =>
        'content' in button ? (
            <ActionModal
                key={button.name}
                trigger={
                    <ActionButton
                        name={button.name}
                        icon={button.icon}
                    />
                }
            >
                <ModalContent content={button.content(car.id, t)} />
            </ActionModal>
        ) : (
            <ActionButton
                key={button.name}
                name={button.name}
                icon={button.icon}
                onClick={() => router.push(button.link)}
            />
        )
    )
}
