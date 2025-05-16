'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FuelType, OdometerUnits } from '@vroomly/prisma'
import type { CarMileageProps, CarProps, CarData } from '@/entities/car'

const initialCar: Partial<CarData> = {
    fuelType: FuelType.gasoline,
    odometerUnits: OdometerUnits.kilometer,
    engineHoursEnabled: false,
    engineHours: null
}

export const InfoFormProvider = memo(function InfoFormProvider({
    car,
    mileage,
    children
}: PropsWithChildren<Partial<CarProps & CarMileageProps>>): JSX.Element {
    const methods = useForm<CarData>({
        defaultValues: { ...initialCar, ...car, mileage: mileage ?? 0 }
    })

    return <FormProvider {...methods}>{children}</FormProvider>
})
