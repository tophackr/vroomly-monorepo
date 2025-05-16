import type { JSX } from 'react'
import { memo } from 'react'
import type { CarProps } from '@/entities/car'
import { EditButton } from '@/entities/edit'
import { useButtonClick } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'

export const CarEditButton = memo(function CarEditButton({
    car
}: CarProps): JSX.Element {
    const props = useButtonClick({ route: pagesRoute.carEdit(car.id) })

    return <EditButton {...props} />
})
