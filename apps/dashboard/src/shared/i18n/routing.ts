import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from './config'

export const routing = defineRouting({
    locales,
    defaultLocale
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing)
