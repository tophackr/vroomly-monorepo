'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'
import type { IMenu } from '@/shared/lib/link-menu'
import { LinkCell } from '@/shared/ui/cell'
import { isAppleClient } from '@/shared/ui/tma'

interface ModalContentProps {
    content: IMenu[]
}

export const ModalContent = memo(function ModalContent({
    content
}: ModalContentProps): JSX.Element[] {
    const isApple = isAppleClient()

    return content.map(({ href, icon, bgColor, name }, index) => (
        <LinkCell
            key={index}
            href={href}
            icon={icon}
            bgColor={bgColor}
            className={cx(isApple && 'bg-secondary')}
        >
            {name}
        </LinkCell>
    ))
})
