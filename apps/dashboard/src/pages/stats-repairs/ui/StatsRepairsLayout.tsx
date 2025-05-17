import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import type { CarIdProps } from '@/entities/car'
import type { ParamsProps } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import { BackButton } from '@/shared/ui/tma'

export const StatsRepairsLayout = memo(async function StatsRepairsLayout({
    children,
    params
}: PropsWithChildren<ParamsProps<CarIdProps>>): Promise<JSX.Element> {
    const { carId } = await params

    return (
        <>
            <BackButton route={pagesRoute.carId(carId)} />

            {children}
        </>
    )
})
