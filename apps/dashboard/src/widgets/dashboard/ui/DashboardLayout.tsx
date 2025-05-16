import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { Header } from '@/features/header'
import { EditContextProvider } from '@/entities/edit'
import { UserInitProvider } from '@/entities/user'

export const DashboardLayout = memo(function DashboardLayout({
    children
}: PropsWithChildren): JSX.Element {
    return (
        <UserInitProvider>
            <EditContextProvider>
                <Header />

                {children}
            </EditContextProvider>
        </UserInitProvider>
    )
})
