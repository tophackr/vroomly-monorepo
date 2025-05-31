import { createContext } from 'react'
import type { EditSetValueContextProps } from './props'

export const EditSetValueContext =
    createContext<EditSetValueContextProps | null>(null)
