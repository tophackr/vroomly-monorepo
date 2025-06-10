import type { JSX, MouseEventHandler } from 'react'
import { memo, useCallback } from 'react'
import { openLink } from '@telegram-apps/sdk-react'
import type { NavigationCellProps } from 'tmaui'
import { NavigationCell } from 'tmaui'
import { useButtonClick } from '@/shared/lib/dom'

export interface LinkCellProps extends NavigationCellProps {
    href: string
}

export const LinkCell = memo(function LinkCell({
    children,
    href,
    onClick: propsOnClick,
    ...props
}: LinkCellProps): JSX.Element {
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
        <NavigationCell
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </NavigationCell>
    )
})
