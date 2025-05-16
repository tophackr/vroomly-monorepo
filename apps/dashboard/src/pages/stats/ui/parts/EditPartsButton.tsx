import type { JSX } from 'react'
import { memo } from 'react'
import type { CarProps } from '@/entities/car'
import { EditButton } from '@/entities/edit'
import { useButtonClick } from '@/shared/lib/dom'
import { statsRoute } from '@/shared/routes'

export const EditPartsButton = memo(function EditPartsButton({
    car
}: CarProps): JSX.Element {
    const props = useButtonClick({ route: statsRoute.partsEdit(car.id) })

    return <EditButton {...props} />
})
