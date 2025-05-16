import type { NestedTranslationClient, Translation } from '@/shared/i18n'
import type { IMenu } from '@/shared/lib/link-menu'
import type { IconName } from '@/shared/ui/icon'

export interface ActionButtonProps {
    icon: IconName
    name: keyof Translation['CarActionButtons']
    link?: string
}

export interface ActionButtonContentProps extends ActionButtonProps {
    content: (
        id: string,
        t: NestedTranslationClient<'CarCategoryName'>
    ) => IMenu[]
}

export interface ActionButtonLinkProps extends ActionButtonProps {
    link: string
}

export type ActionModalProps = ActionButtonContentProps | ActionButtonLinkProps
