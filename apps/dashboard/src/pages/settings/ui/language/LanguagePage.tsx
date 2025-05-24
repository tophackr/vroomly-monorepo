'use client'

import { List, Section } from '@telegram-apps/telegram-ui'
import { useTranslations, useLocale } from 'use-intl'
import { BackButton } from '@/shared/ui/tma'
import { SectionContent } from './SectionContent'

export function LanguagePage() {
    const locale = useLocale()
    const t = useTranslations('Settings')

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
