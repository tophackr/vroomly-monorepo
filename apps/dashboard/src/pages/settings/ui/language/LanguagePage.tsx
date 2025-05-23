import { List, Section } from '@telegram-apps/telegram-ui'
import { getLocale, getTranslations } from 'next-intl/server'
import { BackButton } from '@/shared/ui/tma'
import { SectionContent } from './SectionContent'

export async function LanguagePage() {
    const locale = await getLocale()
    const t = await getTranslations('Settings')

    return (
        <BackButton>
            <List>
                <Section header={t('language')}>
                    <SectionContent locale={locale} />
                </Section>
            </List>
        </BackButton>
    )
}
