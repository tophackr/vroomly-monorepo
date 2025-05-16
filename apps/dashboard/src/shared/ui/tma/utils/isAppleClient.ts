'use client'

import type { RetrieveLPResult } from '@telegram-apps/sdk-react'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function isAppleClient(launchParams?: RetrieveLPResult): boolean {
    if (!launchParams) {
        launchParams = retrieveLaunchParams()
    }

    return ['macos', 'ios'].includes(launchParams.tgWebAppPlatform)
}
