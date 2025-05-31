import type { JSX } from 'react'
import { Outlet } from 'react-router'
import { Header } from '@/features/header'
import { EditContextProvider } from '@/entities/edit'

export function DashboardLayout(): JSX.Element {
    return (
        <EditContextProvider>
            <Header />

            <Outlet />
        </EditContextProvider>
    )
}
