'use client'

import { memo, useEffect } from 'react'
import { useEditSetValueContext } from '../lib/context/hooks/useEditSetValueContext'
import type { EditButtonProps } from '../model/props'

export const EditButton = memo(function EditButton(props: EditButtonProps) {
    const { setEditValue } = useEditSetValueContext()

    useEffect(() => {
        setEditValue(props)

        return () => {
            setEditValue()
        }
    }, [props, setEditValue])

    return null
})
