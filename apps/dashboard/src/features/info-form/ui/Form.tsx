'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { List } from '@telegram-apps/telegram-ui'
import type { CarMileageProps, CarProps } from '@/entities/car'
import { useFindAllCarsQuery } from '@/entities/car'
import { useLogger } from '@/shared/model'
import { DefaultSection } from './DefaultSection'
import { DeleteCarButton } from './DeleteCarButton'
import { FuelSection } from './FuelSection'
import { InfoFormProvider } from './InfoFormProvider'
import { InfoSection } from './InfoSection'
import { MileageSection } from './MileageSection'
import { SaveCarButton } from './SaveCarButton'

export const Form = memo(function Form({
    car,
    mileage
}: Partial<CarProps & CarMileageProps>): JSX.Element {
    const { error: logError } = useLogger()

    const { data: cars, isError, error } = useFindAllCarsQuery()

    if (isError) logError('InfoForm', error)

    const showDefaultButton =
        cars && ((cars.length > 0 && !car) || cars.length > 1)

    return (
        <List>
            <InfoFormProvider
                {...(car ? { car } : {})}
                {...(mileage ? { mileage } : {})}
            >
                {showDefaultButton && <DefaultSection />}

                <div className={'grid gap-x-4 md:grid-cols-2'}>
                    <InfoSection />
                    <FuelSection />
                    <MileageSection />
                </div>

                <SaveCarButton />
            </InfoFormProvider>

            {car && <DeleteCarButton carId={car.id} />}
        </List>
    )
})
