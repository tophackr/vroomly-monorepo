import type {
    BaseQueryFn,
    FetchBaseQueryArgs
} from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { initDataRaw } from '@telegram-apps/sdk-react'
import { delay } from '@/shared/lib/dom'
import { getLogger } from '@/shared/model/MainContextProvider'
import { getUnauthorizedError } from './unauthorized-error/getUnauthorizedError'

export const baseQueryArgs: FetchBaseQueryArgs = {
    // eslint-disable-next-line no-undef
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const baseQueryAuthArgs: FetchBaseQueryArgs = {
    ...baseQueryArgs,
    prepareHeaders: headers => {
        const initData = initDataRaw()

        if (initData) {
            headers.set('X-Telegram-Data', initData)
        }
    }
}

export const baseQueryWithReAuth: BaseQueryFn = async (
    args,
    api,
    extraOptions
) => {
    const result = await fetchBaseQuery(baseQueryAuthArgs)(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        args,
        api,
        extraOptions
    )

    const retryAfter = (result?.error?.data as { remainingTime: number })
        ?.remainingTime

    if (result.error && result.error.status === 429 && retryAfter) {
        const { forceError } = getLogger()

        const secondsToWait = Number(retryAfter) || 0

        forceError(
            `You have exceeded your rate limit. Retrying in ${secondsToWait} seconds.`
        )

        await delay(secondsToWait * 1000)
        return baseQueryWithReAuth(args, api, extraOptions)
    }

    if (result.error && result.error.status === 401) {
        await getUnauthorizedError()
    }

    return result
}
