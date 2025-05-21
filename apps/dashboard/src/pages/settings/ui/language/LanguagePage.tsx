'use client'

import type { ChangeEvent } from 'react'
import { useCallback, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Cell, List, Section, Selectable } from '@telegram-apps/telegram-ui'
import { useUpdateUserMutation } from '@/entities/user'
import type { Locale } from '@/shared/i18n'
import { localesMap } from '@/shared/i18n'
import { useLocale } from '@/shared/lib/store'
import { BackButton } from '@/shared/ui/tma'

export function LanguagePage() {
    const t = useTranslations('Settings')
    const { locale, setLocaleWithCloud } = useLocale()

    const [isPending, startTransition] = useTransition()
    const [updateUserMutation, { isLoading }] = useUpdateUserMutation()

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (isPending || isLoading) {
                return
            }

            startTransition(async () => {
                setLocaleWithCloud(e.target.value as Locale)
                await updateUserMutation({
                    body: { language: e.target.value as Locale }
                })
            })
        },
        [isLoading, isPending, setLocaleWithCloud, updateUserMutation]
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
                                    checked={l.key === locale}
                                    onChange={onChange}
                                    disabled={isPending}
                                />
                            }
                            key={l.key}
                            subtitle={l.subtitle}
                            disabled={isPending}
                        >
                            {l.title}
                        </Cell>
                    ))}
                </Section>
            </List>
        </BackButton>
    )
}
