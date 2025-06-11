import type { RouteObject } from 'react-router'
import { CarEditPage, CarIdLayout, CarIdPage, CarNewPage } from '@/pages/car'
import { interactionRouter } from './interaction'
import { statsRouter } from './stats'

export const carRouter: RouteObject[] = [
    { path: 'new', Component: CarNewPage },
    {
        path: ':carId',
        Component: CarIdLayout,
        children: [
            { index: true, Component: CarIdPage },
            { path: 'edit', Component: CarEditPage },
            { path: ':type', children: interactionRouter },
            { path: 'stats', children: statsRouter }
        ]
    }
]
