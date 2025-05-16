import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReAuth } from './interceptors'
import { ApiTags } from './types'

export const backendApi = createApi({
    reducerPath: 'backend/api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: Object.values(ApiTags),
    endpoints: () => ({})
})
