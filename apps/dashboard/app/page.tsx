// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation'
import { defaultLocale } from '@/shared/i18n'

export default function RootPage() {
    redirect(`/${defaultLocale}`)
}
