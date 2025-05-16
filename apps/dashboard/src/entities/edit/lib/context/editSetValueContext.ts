import { createContext } from 'react'
import { defaultCallback } from '../../config/defaults'
import type { EditSetValueContextProps } from './props'

export const EditSetValueContext = createContext<EditSetValueContextProps>({
    setEditValue: defaultCallback
})
