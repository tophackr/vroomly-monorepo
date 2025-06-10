import { Route, Routes } from 'react-router'
import { CarEditPage, CarIdLayout, CarIdPage, CarNewPage } from '@/pages/car'
import { HomePage } from '@/pages/home'
import {
    InteractionEditPage,
    InteractionIdLayout,
    InteractionIdPage,
    InteractionNewPage
} from '@/pages/interaction'
import { NotFound } from '@/pages/not-found'
import { LanguagePage, SettingsPage } from '@/pages/settings'
import { StatsCostPage } from '@/pages/stats-cost'
import { StatsFuelPage } from '@/pages/stats-fuel'
import { StatsListPage } from '@/pages/stats-list'
import { StatsRepairsPage } from '@/pages/stats-repairs'
import { StatsRepairsEditPage } from '@/pages/stats-repairs-edit'
import { DashboardLayout } from '@/widgets/dashboard'

export function AppRouter() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route
                    index
                    element={<HomePage />}
                />

                <Route path='car'>
                    <Route
                        path='new'
                        element={<CarNewPage />}
                    />

                    <Route
                        path=':carId'
                        element={<CarIdLayout />}
                    >
                        <Route
                            index
                            element={<CarIdPage />}
                        />
                        <Route
                            path='edit'
                            element={<CarEditPage />}
                        />

                        <Route path=':type'>
                            <Route
                                path='new'
                                element={<InteractionNewPage />}
                            />

                            <Route
                                path=':interactionId'
                                element={<InteractionIdLayout />}
                            >
                                <Route
                                    index
                                    element={<InteractionIdPage />}
                                />
                                <Route
                                    path='edit'
                                    element={<InteractionEditPage />}
                                />
                            </Route>
                        </Route>

                        <Route path='stats'>
                            <Route
                                path='cost'
                                element={<StatsCostPage />}
                            />
                            <Route
                                path='fuel'
                                element={<StatsFuelPage />}
                            />
                            <Route
                                path='list'
                                element={<StatsListPage />}
                            />
                            <Route path='repairs'>
                                <Route
                                    index
                                    element={<StatsRepairsPage />}
                                />
                                <Route
                                    path='edit'
                                    element={<StatsRepairsEditPage />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path='settings'>
                <Route
                    index
                    element={<SettingsPage />}
                />
                <Route
                    path='language'
                    element={<LanguagePage />}
                />
            </Route>

            <Route
                path='*'
                element={<NotFound />}
            />
        </Routes>
    )
}
