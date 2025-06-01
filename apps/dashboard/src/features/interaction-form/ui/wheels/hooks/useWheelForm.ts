import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { WheelType } from '@vroomly/prisma'
import type {
    InteractionDataForm,
    WheelInteractionData
} from '@/entities/interaction'
import { useWatchField } from './useWatchField'

interface UseWheelFormReturn {
    wheelType: WheelType
}

export function useWheelForm(): UseWheelFormReturn {
    const { watch, setValue, getValues } = useFormContext<InteractionDataForm>()

    const watchWheelType = watch('wheelData.wheelType')
    const [prevWheelType, setPrevWheelType] = useState<WheelType>(
        () => getValues().wheelData.wheelType
    )

    const sizeKeys = useMemo<(keyof WheelInteractionData)[]>(
        () => ['width', 'height', 'diameter'],
        []
    )

    useEffect(() => {
        if (prevWheelType !== watchWheelType) {
            for (const i of sizeKeys) setValue(`wheelData.${i}`, null)

            setValue(
                watchWheelType === WheelType.tire
                    ? 'wheelData.tireType'
                    : 'wheelData.rimType',
                null
            )

            setTimeout(() => {
                setPrevWheelType(watchWheelType)
            }, 100)
        }
    }, [prevWheelType, setValue, sizeKeys, watchWheelType])

    useWatchField('wheelData.tireType')
    useWatchField('wheelData.rimType')
    useWatchField('wheelData.width')
    useWatchField('wheelData.height')
    useWatchField('wheelData.diameter')

    return { wheelType: prevWheelType }
}
