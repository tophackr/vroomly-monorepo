'use client'

import type { JSX, MouseEventHandler } from 'react'
import { memo, useCallback } from 'react'
import { openLink } from '@telegram-apps/sdk-react'
import { Cell as TGUICell } from 'tmaui'
import { useButtonClick } from '@/shared/lib/dom'
import { ChevronAfterCell } from '../chevron-after/ChevronAfterCell'
import { IconBeforeCell } from '../icon/IconBeforeCell'
import type { LinkCellProps, OptionalIconBeforeCellProps } from './types'

export const LinkCell = memo(function LinkCell({
    children,
    href,
    icon,
    bgColor,
    text,
    onClick: propsOnClick,
    ...props
}: LinkCellProps & OptionalIconBeforeCellProps): JSX.Element {
    const { disabled, onClick: onClickHref } = useButtonClick({ route: href })

    const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        e => {
            propsOnClick?.(e)

            // Compute if target path is external. In this case we would like to open link using
            // TMA method.
            let path: string
            if (typeof href === 'string') {
                path = href
            } else {
                const { search = '', pathname = '', hash = '' } = href
                path = `${pathname}?${search}#${hash}`
            }

            const targetUrl = new URL(path, window.location.toString())
            const currentUrl = new URL(window.location.toString())
            const isExternal =
                targetUrl.protocol !== currentUrl.protocol ||
                targetUrl.host !== currentUrl.host

            if (isExternal) {
                e.preventDefault()
                openLink(targetUrl.toString())
            } else {
                void onClickHref(e)
            }
        },
        [href, onClickHref, propsOnClick]
    )

    return (
        <TGUICell
            Component={'label'}
            before={
                icon &&
                bgColor && (
                    <IconBeforeCell
                        icon={icon}
                        bgColor={bgColor}
                    />
                )
            }
            after={<ChevronAfterCell text={text} />}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </TGUICell>
    )
})
