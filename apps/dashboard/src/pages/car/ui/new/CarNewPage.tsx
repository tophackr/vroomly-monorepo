import type { JSX } from 'react'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInfoForm } from '../DynamicInfoForm'

export function CarNewPage(): JSX.Element {
    return (
        <>
            <BackButton />

            <DynamicInfoForm />
        </>
    )
}
