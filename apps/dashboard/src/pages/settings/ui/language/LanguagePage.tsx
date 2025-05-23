import { List, Section } from '@telegram-apps/telegram-ui'
import { getTranslations } from 'next-intl/server'
import type { LocaleProps } from '@/shared/i18n'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { SectionContent } from './SectionContent'

export async function LanguagePage({ params }: ParamsProps<LocaleProps>) {
    const { locale } = await params
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
