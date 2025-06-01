'use client'

import type { JSX, MouseEvent as RME } from 'react'
import { memo, useEffect, useRef } from 'react'
import type { CellProps } from 'tmaui'
import { Cell as TGUICell } from 'tmaui'

export const CheckCell = memo(function CheckCell({
    children,
    onClick,
    ...props
}: CellProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const target = ref.current?.querySelector('.tgui-8735a62be5a8b8a7')

        if (target && onClick) {
            const handleClick = (event: Event) => {
                onClick(event as unknown as RME<HTMLDivElement, MouseEvent>)
            }

            target.addEventListener('click', handleClick)

            return () => {
                target.removeEventListener('click', handleClick)
            }
        }

        return null
    }, [onClick])

    return (
        <TGUICell
            ref={ref}
            interactiveAnimation={'opacity'}
            {...props}
        >
            {children}
        </TGUICell>
    )
})
