import type { JSX } from 'react'
import { List, Placeholder } from '@telegram-apps/telegram-ui'
import { getTranslations } from 'next-intl/server'
import { DuckNotFoundLottie } from '@/shared/ui/lottie'
import { BackButton } from '@/shared/ui/tma'
import { ReturnBackButton } from './ReturnBackButton'
import { ReturnHomeButton } from './ReturnHomeButton'

export async function NotFound(): Promise<JSX.Element> {
    const t = await getTranslations('NotFound')

    return (
        <>
            <BackButton />

            <List className={'flex min-h-screen content-center'}>
                <Placeholder
                    header={t('title')}
                    description={t('description')}
                >
                    <DuckNotFoundLottie className={'size-36'} />
                </Placeholder>
            </List>

            <ReturnBackButton text={t('buttons.back')} />
            <ReturnHomeButton text={t('buttons.home')} />
        </>
    )
}
