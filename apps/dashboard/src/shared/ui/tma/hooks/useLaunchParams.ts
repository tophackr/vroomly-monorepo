import { useMemo } from 'react'
import type { RetrieveLPResult } from '@telegram-apps/sdk-react'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function useLaunchParams(): RetrieveLPResult {
    return useMemo(() => retrieveLaunchParams(), [])
}
