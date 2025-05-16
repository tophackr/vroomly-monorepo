import { useEffect, useRef, useState } from 'react'
import type { FieldPath } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import type { InteractionDataForm } from '@/entities/interaction'

export function useWatchField(field: FieldPath<InteractionDataForm>): void {
    const { watch, setValue, getValues, resetField } =
        useFormContext<InteractionDataForm>()

    const value = getValues(field)
    const watchField = watch(field)

    const isFirstRender = useRef(true)
    const [fieldValue, setFieldValue] = useState(value)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            resetField(field, {
                defaultValue: value || null
            })
        }

        if (fieldValue !== watchField) {
            const newValue = watchField || null

            if (fieldValue !== newValue) {
                setValue(field, newValue)
            }

            setFieldValue(watchField)
        }
    }, [field, fieldValue, resetField, setValue, value, watchField])
}
