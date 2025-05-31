import type { JSX } from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router'
import type { SecondaryButtonState } from '@telegram-apps/sdk-react'
import { useButtonClick } from '@/shared/lib/dom'
import { SecondaryButton } from '@/shared/ui/tma'

type ReturnBackButtonProps = Pick<SecondaryButtonState, 'text'>

export const ReturnBackButton = memo(function ReturnBackButton({
    text
}: ReturnBackButtonProps): JSX.Element {
    const navigate = useNavigate()

    const { disabled, onClick } = useButtonClick<void>({
        callback: () => void navigate(-1)
    })

    return (
        <SecondaryButton
            text={text}
            isLoaderVisible={disabled}
            isEnabled={!disabled}
            onClick={onClick}
        />
    )
})
