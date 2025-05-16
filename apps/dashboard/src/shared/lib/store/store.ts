import type { Reducer } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { backendApi } from './server/backend'

export function makeStore(reducer: Reducer) {
    return configureStore({
        reducer,
        middleware: getDefaultMiddleware =>
            // eslint-disable-next-line unicorn/prefer-spread
            getDefaultMiddleware().concat(backendApi.middleware)
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
