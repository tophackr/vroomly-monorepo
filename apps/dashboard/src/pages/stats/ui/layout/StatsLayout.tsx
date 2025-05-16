import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { BackButton } from '@/shared/ui/tma'

export const StatsLayout = memo(function StatsLayout({
    children
}: PropsWithChildren): JSX.Element {
    return (
        <>
            <BackButton />

            {children}
        </>
    )
})
