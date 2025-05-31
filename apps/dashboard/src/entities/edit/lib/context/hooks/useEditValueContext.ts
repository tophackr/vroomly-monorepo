import { useContext } from 'react'
import { EditValueContext } from '../editValueContext'

export function useEditValueContext() {
    const context = useContext(EditValueContext)

    if (!context) {
        throw new Error('Edit Value Context cannot be used out of context.')
    }

    return context
}
