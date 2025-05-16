import type { JSX } from 'react'
import { InfoInputs } from './InfoInputs'
import { SizeSelects } from './SizeSelects'

export function WheelsSection(): JSX.Element {
    return (
        <>
            <InfoInputs />

            <SizeSelects />
        </>
    )
}
