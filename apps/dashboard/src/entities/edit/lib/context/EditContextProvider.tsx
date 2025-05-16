'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo, useState } from 'react'
import type { EditButtonProps } from '../../model/props'
import { EditSetValueContext } from './editSetValueContext'
import { EditValueContext } from './editValueContext'

export const EditContextProvider = memo(function EditContextProvider({
    children
}: PropsWithChildren): JSX.Element {
    const [editValue, setEditValue] = useState<EditButtonProps>()

    return (
        <EditSetValueContext.Provider value={{ setEditValue }}>
            <EditValueContext.Provider value={{ editValue }}>
                {children}
            </EditValueContext.Provider>
        </EditSetValueContext.Provider>
    )
})
