import type { ElementType, JSX } from 'react'
import { memo } from 'react'
import type { LucideProps } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { IconName } from './types'

interface IconProps extends LucideProps {
    name: IconName
}

const IconsMap = LucideIcons

export const Icon = memo(function Icon({
    name,
    ...props
}: IconProps): JSX.Element {
    const IconComponent =
        (IconsMap[name] as ElementType) || LucideIcons.HelpCircle

    return <IconComponent {...props} />
})
