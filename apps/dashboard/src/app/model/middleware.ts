import type { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, routing } from '@/shared/i18n'

const handleI18nRouting = createMiddleware(routing)

export function middleware(
    request: NextRequest
): NextResponse<unknown> | undefined {
    const { pathname } = request.nextUrl

    const shouldHandle =
        ['/', '/app'].includes(pathname) ||
        new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(pathname)

    if (!shouldHandle) {
        return
    }

    // todo: remove next lines after release next stable
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return handleI18nRouting(request)
}
