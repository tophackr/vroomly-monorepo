'use client'

import { List, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import type { RenderLinkProps } from '@/shared/ui/cell'
import { renderLink } from '@/shared/ui/cell'
import { BackButton } from '@/shared/ui/tma'
import { settingsRoute } from '../routes/settings'

export function SettingsPage() {
    const t = useTranslations('Settings')
    const tLocale = useTranslations('Locale')

    const firstSection: RenderLinkProps[] = [
        {
            title: t('language'),
            icon: 'Earth',
            color: 'MediumPurple',
            href: settingsRoute.language,
            after: tLocale('subtitle')
        },
        {
            title: t('timezone'),
            icon: 'Clock',
            color: 'DarkGray',
            href: settingsRoute.timezone,
            after: 'Europe/Moscow'
        }
    ]
    const secondSection: RenderLinkProps[] = [
        {
            title: t('support'),
            icon: 'Headset',
            color: 'LimeGreen',
            href: ''
        },
        {
            title: t('news'),
            icon: 'Newspaper',
            color: 'Orange',
            href: ''
        }
    ]

    return (
        <BackButton>
            <List>
                <Section>
                    {renderLink({
                        title: t('notification'),
                        icon: 'BellDot',
                        color: 'OrangeRed',
                        href: settingsRoute.notification
                    })}
                </Section>
                <Section>{firstSection.map(link => renderLink(link))}</Section>
                <Section>{secondSection.map(link => renderLink(link))}</Section>
            </List>
        </BackButton>
    )
}
