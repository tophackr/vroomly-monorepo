'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { RepairsProps } from '@/entities/repair'

export const RepairsEditFormProvider = memo(function RepairsEditFormProvider({
    repairs,
    children
}: PropsWithChildren<RepairsProps>): JSX.Element {
    const methods = useForm<RepairsProps>({
        defaultValues: { repairs }
    })

    return <FormProvider {...methods}>{children}</FormProvider>
})
