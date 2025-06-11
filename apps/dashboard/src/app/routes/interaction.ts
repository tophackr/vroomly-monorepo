import type { RouteObject } from 'react-router'
import {
    InteractionEditPage,
    InteractionIdLayout,
    InteractionIdPage,
    InteractionNewPage
} from '@/pages/interaction'

export const interactionRouter: RouteObject[] = [
    { path: 'new', Component: InteractionNewPage },
    {
        path: ':interactionId',
        Component: InteractionIdLayout,
        children: [
            { index: true, Component: InteractionIdPage },
            { path: 'edit', Component: InteractionEditPage }
        ]
    }
]
