'use client'

import type { JSX } from 'react'
import { useTranslations } from 'next-intl'
import { List, Section } from '@telegram-apps/telegram-ui'
import { useCarContext } from '@/entities/car'
import { generateMenu } from '@/shared/lib/link-menu'
import { statsRoute } from '@/shared/routes'
import { LinkCell } from '@/shared/ui/cell'
import { menuData } from './menuData'
import type { StatsCategory } from './types'

export function Stats(): JSX.Element {
    const t = useTranslations('StatsCategoryName')
    const { car } = useCarContext()

    const data = generateMenu(
        (name: StatsCategory) => statsRoute[name](car.id),
        t,
        menuData
    )

    const sections = [...new Set(data.map(menu => menu.group))]

    return (
        <List>
            {sections.map(group => {
                const items = data.filter(menu => menu.group === group)

                return (
                    <Section key={group}>
                        {items.map(({ name, href, icon, bgColor }, index) => (
                            <LinkCell
                                key={index}
                                href={href}
                                icon={icon}
                                bgColor={bgColor}
                            >
                                {name}
                            </LinkCell>
                        ))}
                    </Section>
                )
            })}
        </List>
    )
}
