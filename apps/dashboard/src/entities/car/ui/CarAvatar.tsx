import type { JSX } from 'react'
import { memo } from 'react'
import type { AvatarProps } from '@telegram-apps/telegram-ui'
import { Avatar } from '@telegram-apps/telegram-ui'

interface CarAvatarProps extends Omit<AvatarProps, 'src' | 'acronym'> {
    name: string
}

export const CarAvatar = memo(function CarAvatar({
    name,
    ...props
}: CarAvatarProps): JSX.Element {
    return (
        <Avatar
            src={`https://img.icons8.com/color/${name.toLowerCase()}.png`}
            acronym={name.charAt(0).toUpperCase()}
            {...props}
        />
    )
})
