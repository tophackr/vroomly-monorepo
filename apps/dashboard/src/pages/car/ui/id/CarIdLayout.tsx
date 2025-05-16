import type { JSX, PropsWithChildren } from 'react'
import { CarContextProvider, type CarIdProps } from '@/entities/car'
import type { ParamsProps } from '@/shared/lib/dom'

export function CarIdLayout({
    children,
    params
}: PropsWithChildren<ParamsProps<CarIdProps>>): JSX.Element {
    return <CarContextProvider params={params}>{children}</CarContextProvider>
}
