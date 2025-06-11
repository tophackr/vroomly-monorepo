import { createBrowserRouter, RouterProvider } from 'react-router'
import { appRouter } from './app'

export function AppRouter() {
    const router = createBrowserRouter(appRouter)
    return <RouterProvider router={router} />
}
