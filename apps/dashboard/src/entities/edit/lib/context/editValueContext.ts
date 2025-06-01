import { createContext } from 'react'
import type { EditValueContextProps } from './props'

export const EditValueContext = createContext<EditValueContextProps | null>(
    null
)
