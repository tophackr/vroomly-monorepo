import { combineReducers } from 'redux'
import { backendApi } from '@/shared/lib/store'

export const rootReducer = combineReducers({
    [backendApi.reducerPath]: backendApi.reducer
})
