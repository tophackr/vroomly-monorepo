import type { JSX } from 'react'
import { memo } from 'react'
import type { CarProps } from '@/entities/car'
import { EditButton } from '@/entities/edit'
import { useButtonClick } from '@/shared/lib/dom'
import { statsRoute } from '@/shared/routes'

export const EditRepairsButton = memo(function EditRepairsButton({
    car
}: CarProps): JSX.Element {
    const props = useButtonClick({ route: statsRoute.repairsEdit(car.id) })

    return <EditButton {...props} />
})
