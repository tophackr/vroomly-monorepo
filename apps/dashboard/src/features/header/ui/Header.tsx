'use client'

import type { JSX } from 'react'
import { useLocation } from 'react-router'
import { List } from 'tmaui'
import { cx } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import { SettingsButton, isAppleClient } from '@/shared/ui/tma'
import { CarsButton } from './buttons/CarsButton'
import { EditButton } from './buttons/EditButton'
import { HeaderLayout } from './HeaderLayout'

export function Header(): JSX.Element {
    const location = useLocation()

    const isApple = isAppleClient()

    return (
        <List role='header'>
            <HeaderLayout>
                <div className={cx('flex justify-between', !isApple && 'p-4')}>
                    <SettingsButton />

                    <div className='flex gap-2'>
                        <EditButton />

                        {pagesRoute.home !== location.pathname && (
                            <CarsButton />
                        )}
                    </div>
                </div>
            </HeaderLayout>
        </List>
    )
}
