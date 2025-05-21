'use client'

import { useTranslations } from 'next-intl'
import { List, Section } from '@telegram-apps/telegram-ui'
import { LinkCell } from '@/shared/ui/cell'
import { BackButton } from '@/shared/ui/tma'
import { settingsRoute } from '../routes/settings'

export function SettingsPage() {
    const t = useTranslations('Settings')

    return (
        <BackButton>
            <List>
                <Section>
                    <LinkCell
                        icon={'BellDot'}
                        bgColor={'OrangeRed'}
                        href={settingsRoute.notification}
                    >
                        {t('notification')}
                    </LinkCell>
                </Section>
                <Section>
                    <LinkCell
                        icon={'Earth'}
                        bgColor={'MediumPurple'}
                        href={settingsRoute.language}
                        text={'Русский'}
                    >
                        {t('language')}
                    </LinkCell>
                    <LinkCell
                        icon={'Clock'}
                        bgColor={'DarkGray'}
                        href={settingsRoute.timezone}
                        text={'Europe/Moscow'}
                    >
                        {t('timezone')}
                    </LinkCell>
                </Section>

                <Section>
                    <LinkCell
                        icon={'Headset'}
                        bgColor={'LimeGreen'}
                        href={''}
                    >
                        {t('support')}
                    </LinkCell>
                    <LinkCell
                        icon={'Newspaper'}
                        bgColor={'Orange'}
                        href={''}
                    >
                        {t('news')}
                    </LinkCell>
                </Section>
            </List>
        </BackButton>
    )
}
