import {
    closeMiniApp,
    initDataUser,
    isMiniAppSupported,
    showPopup
} from '@telegram-apps/sdk-react'
import type { Locale } from '@/shared/i18n'
import { getLocales } from '@/shared/i18n'
import type { PopupCallbacks } from '@/shared/ui/tma'
import { getPopup } from '@/shared/ui/tma'
import { ButtonIds } from './types'

export async function getUnauthorizedError() {
    const user = initDataUser()
    const { messages } = await getLocales(user?.language_code as Locale)
    const t = messages['PopupUnauthorizedError']

    const popupCallbacks: PopupCallbacks = {
        [ButtonIds.close]: () => closeMiniApp(),
        [ButtonIds.cancel]: () => (window.location.href = '/')
    }

    if (showPopup.isAvailable()) {
        await getPopup(
            {
                title: t['title'],
                message: t['description'],
                buttons: [
                    {
                        id: ButtonIds.close,
                        type: 'close'
                    },
                    {
                        id: ButtonIds.cancel,
                        type: 'cancel'
                    }
                ]
            },
            popupCallbacks
        )
    } else if (!isMiniAppSupported() && window !== undefined) {
        window.close()
    }
}
