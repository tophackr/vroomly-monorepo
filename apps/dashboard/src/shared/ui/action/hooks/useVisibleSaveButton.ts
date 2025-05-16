import { useCallback, useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { isCleanedEqual } from '@/shared/lib/lodash'
import { useWatchForm } from '@/shared/ui/form'

interface UseVisibleSaveButtonReturn {
    isVisible: boolean
}

export function useVisibleSaveButton<T extends FieldValues>(
    removeZero?: boolean
): UseVisibleSaveButtonReturn {
    const { getValues, watch } = useFormContext<T>()

    const [isVisible, setIsVisible] = useState(false)
    const [values, setValues] = useState<T>()

    if (!values) {
        setValues(getValues())
    }

    const onWatchCallback = useCallback(
        (data: T) => {
            if (!values) {
                return
            }

            setIsVisible(!isCleanedEqual(values, data, removeZero))
        },
        [removeZero, values]
    )

    useWatchForm({
        watch,
        callback: onWatchCallback
    })

    return { isVisible }
}
