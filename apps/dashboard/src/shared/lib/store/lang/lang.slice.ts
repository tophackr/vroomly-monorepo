import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { WritableDraft } from 'immer'
import type { Locale } from '@/shared/i18n'
import { defaultLocale } from '@/shared/i18n'
import type { RootState } from '../store'

interface LocaleState {
    value: Locale
}

const initialState: LocaleState = {
    value: defaultLocale
}

const localeSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLocale(
            state: WritableDraft<LocaleState>,
            action: PayloadAction<Locale>
        ) {
            state.value = action.payload
        }
    }
})

export const selectLocale = (state: RootState) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (state['localeSlice'] as LocaleState).value

export const { actions: localeSliceActions, reducer: localeSliceReducer } =
    localeSlice
