'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo, useMemo, useState } from 'react'
import type { EditButtonProps } from '../../model/props'
import { EditSetValueContext } from './editSetValueContext'
import { EditValueContext } from './editValueContext'

export const EditContextProvider = memo(function EditContextProvider({
    children
}: PropsWithChildren): JSX.Element {
    const [editValue, setEditValue] = useState<EditButtonProps>()

    const setValue = useMemo(() => ({ setEditValue }), [setEditValue])
    const value = useMemo(() => ({ editValue }), [editValue])

    return (
        <EditSetValueContext value={setValue}>
            <EditValueContext value={value}>{children}</EditValueContext>
        </EditSetValueContext>
    )
})
