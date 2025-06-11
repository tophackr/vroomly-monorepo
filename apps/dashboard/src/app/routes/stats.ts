import type { RouteObject } from 'react-router'
import { StatsCostPage } from '@/pages/stats-cost'
import { StatsFuelPage } from '@/pages/stats-fuel'
import { StatsListPage } from '@/pages/stats-list'
import { StatsRepairsPage } from '@/pages/stats-repairs'
import { StatsRepairsEditPage } from '@/pages/stats-repairs-edit'

export const statsRouter: RouteObject[] = [
    { path: 'cost', Component: StatsCostPage },
    { path: 'fuel', Component: StatsFuelPage },
    { path: 'list', Component: StatsListPage },
    {
        path: 'repairs',
        children: [
            { index: true, Component: StatsRepairsPage },
            { path: 'edit', Component: StatsRepairsEditPage }
        ]
    }
]
