import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { Header } from '@/features/header'
import { EditContextProvider } from '@/entities/edit'

export const DashboardLayout = memo(function DashboardLayout({
    children
}: PropsWithChildren): JSX.Element {
    return (
        <EditContextProvider>
            <Header />

            {children}
        </EditContextProvider>
    )
})
