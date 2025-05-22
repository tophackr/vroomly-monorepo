'use client'

import type { ChangeEvent } from 'react'
import { useCallback, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Cell, List, Section, Selectable } from '@telegram-apps/telegram-ui'
import { useUpdateUserMutation } from '@/entities/user'
import type { Locale } from '@/shared/i18n'
import { localesMap, useLocaleSwitch } from '@/shared/i18n'
import { useLogger } from '@/shared/model'
import { BackButton } from '@/shared/ui/tma'

export function LanguagePage() {
    const t = useTranslations('Settings')
    const { error: logError } = useLogger()

    const { switchLocale } = useLocaleSwitch()
    const locale = useLocale()

    const [isLoading, setIsLoading] = useState(false)

    const [updateUserMutation] = useUpdateUserMutation()

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (isLoading) {
                return
            }

            setIsLoading(true)

            void updateUserMutation({
                body: { language: e.target.value as Locale }
            }).then(({ data, error }) => {
                if (data) {
                    switchLocale(data.language as Locale)
                }
                if (error) {
                    logError(error)
                    setIsLoading(false)
                }
            })
        },
        [isLoading, logError, switchLocale, updateUserMutation]
    )

    return (
        <BackButton>
            <List>
                <Section header={t('language')}>
                    {localesMap.map(l => (
                        <Cell
                            Component={'label'}
                            after={
                                <Selectable
                                    name='language'
                                    value={l.key}
                                    checked={l.key === (locale as Locale)}
                                    onChange={onChange}
                                    disabled={isLoading}
                                />
                            }
                            key={l.key}
                            subtitle={l.subtitle}
                            disabled={isLoading}
                        >
                            {l.title}
                        </Cell>
                    ))}
                </Section>
            </List>
        </BackButton>
    )
}
