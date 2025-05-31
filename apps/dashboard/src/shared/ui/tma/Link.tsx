import type { ComponentProps, JSX, MouseEventHandler } from 'react'
import { memo, useCallback } from 'react'
import { Link as ReactLink } from 'react-router'
import { openLink } from '@telegram-apps/sdk-react'
import { cx } from '@/shared/lib/dom'

type IntlProps = ComponentProps<typeof ReactLink>

export const Link = memo(function Link({
    className,
    onClick: propsOnClick,
    to: href,
    ...props
}: IntlProps): JSX.Element {
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
            }
        },
        [href, propsOnClick]
    )

    return (
        <ReactLink
            {...props}
            to={href}
            onClick={onClick}
            className={cx('text-link no-underline', className)}
        />
    )
})
