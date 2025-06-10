'use client'

import type { JSX } from 'react'
import { IconButton } from 'tmaui'
import { useEditValueContext } from '@/entities/edit'
import { Icon } from '@/shared/ui/icon'

export function EditButton(): JSX.Element | undefined {
    const { editValue } = useEditValueContext()

    return (
        editValue && (
            <IconButton
                size='m'
                {...editValue}
            >
                <Icon name={editValue?.icon ?? 'Pencil'} />
            </IconButton>
        )
    )
}
