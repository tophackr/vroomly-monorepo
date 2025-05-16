'use client'

import { useContext } from 'react'
import { EditSetValueContext } from '../editSetValueContext'

export function useEditSetValueContext() {
    const context = useContext(EditSetValueContext)

    if (!context) {
        throw new Error('Edit Set Value Context cannot be used out of context.')
    }

    return context
}
