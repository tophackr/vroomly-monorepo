'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FuelGrade, InteractionCategory, WheelType } from '@vroomly/prisma'
import { useCarContext } from '@/entities/car'
import type {
    CategoryProps,
    InteractionProps,
    InteractionData,
    InteractionDataForm
} from '@/entities/interaction'

export const InteractionFormProvider = memo(function ActionFormProvider({
    children,
    category,
    interaction
}: PropsWithChildren<CategoryProps & Partial<InteractionProps>>): JSX.Element {
    const { mileage } = useCarContext()

    let values: Omit<InteractionDataForm, 'date'> = {
        type: category,
        mileage,
        amount: null,
        engineHours: null,
        description: null,
        fuelData: null,
        repairData: null,
        partData: null,
        wheelData: null
    }

    if (category === InteractionCategory.fuel) {
        values = {
            ...values,
            fuelData: {
                fuelGrade: FuelGrade.ai92,
                capacityFull: null,
                capacity: null,
                price: null,
                beforeRefueling: null,
                afterRefueling: null
            }
        }
    } else if (category === InteractionCategory.purchase_wheels) {
        values = {
            ...values,
            wheelData: {
                wheelType: WheelType.tire,
                tireType: null,
                rimType: null,
                brand: null,
                model: null,
                width: null,
                height: null,
                diameter: null
            }
        }
    }

    const formatDate = useCallback(
        // eslint-disable-next-line no-commented-code/no-commented-code
        // date expects the Date type, we forcibly assign the Date class without
        // waiting for an error, input waits for a string
        (date: Date) => date.toISOString().split('T')[0]! as unknown as Date,
        []
    )

    const methods = useForm<InteractionData>({
        defaultValues: {
            ...values,
            ...interaction,
            date: interaction?.date
                ? formatDate(new Date(interaction.date))
                : formatDate(new Date())
        }
    })

    return <FormProvider {...methods}>{children}</FormProvider>
})
