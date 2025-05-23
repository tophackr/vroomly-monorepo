import { List, Section } from '@telegram-apps/telegram-ui'
import { getTranslations } from 'next-intl/server'
import { LinkCell } from '@/shared/ui/cell'
import { BackButton } from '@/shared/ui/tma'
import { settingsRoute } from '../routes/settings'

export async function SettingsPage() {
    const t = await getTranslations('Settings')
    const tLocale = await getTranslations('Locale')

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
                        text={tLocale('subtitle')}
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
