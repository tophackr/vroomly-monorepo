import type { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, routing } from '@/shared/i18n'

const handleI18nRouting = createMiddleware(routing)

export function middleware(
    request: NextRequest
): NextResponse<unknown> | undefined {
    const { pathname } = request.nextUrl

    const shouldHandle =
        pathname === '/' ||
        new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(pathname)

    if (!shouldHandle) {
        return
    }

    return handleI18nRouting(request)
}
