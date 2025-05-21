import { combineReducers } from 'redux'
import { backendApi, localeSliceReducer } from '@/shared/lib/store'

export const rootReducer = combineReducers({
    [backendApi.reducerPath]: backendApi.reducer,
    localeSlice: localeSliceReducer
})
