import { Icon } from '../icon/Icon'
import type { IconName } from '../icon/types'
import { LinkCell } from './LinkCell'

export interface RenderLinkProps {
    title: string
    icon: IconName
    color: string
    href: string
    after?: string
}

export const renderLink = (props: RenderLinkProps) => (
    <LinkCell
        icon={<Icon name={props.icon} />}
        color={props.color}
        href={props.href}
        after={
            props.after && (
                <span className='whitespace-nowrap'>{props.after}</span>
            )
        }
    >
        {props.title}
    </LinkCell>
)
