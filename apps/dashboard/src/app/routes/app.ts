import type { RouteObject } from 'react-router'
import { HomePage } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { LanguagePage, SettingsPage } from '@/pages/settings'
import { DashboardLayout } from '@/widgets/dashboard'
import { carRouter } from './car'

export const appRouter: RouteObject[] = [
    {
        Component: DashboardLayout,
        children: [
            { index: true, Component: HomePage },
            { path: 'car', children: carRouter }
        ]
    },
    {
        path: 'settings',
        children: [
            { index: true, Component: SettingsPage },
            { path: 'language', Component: LanguagePage }
        ]
    },
    { path: '*', Component: NotFound }
]
