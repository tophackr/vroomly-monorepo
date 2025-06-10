'use client'

import type { JSX } from 'react'
import { IconButton } from 'tmaui'
import { useButtonClick } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import { Icon } from '@/shared/ui/icon'

export function CarsButton(): JSX.Element {
    const props = useButtonClick({ route: pagesRoute.home })

    return (
        <IconButton
            size='m'
            {...props}
        >
            <Icon name='Car' />
        </IconButton>
    )
}
