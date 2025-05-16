import type { ShowPopupOptions } from '@telegram-apps/sdk-react'
import { showPopup } from '@telegram-apps/sdk-react'

export type PopupCallbacks = Record<string, () => void>

export async function getPopup(
    options: ShowPopupOptions,
    callbacks: PopupCallbacks
): Promise<void | '' | null> {
    const buttonId = await showPopup(options)
    return buttonId && callbacks[buttonId]?.()
}
