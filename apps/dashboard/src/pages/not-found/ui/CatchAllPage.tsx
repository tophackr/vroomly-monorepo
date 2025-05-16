import type { JSX } from 'react'
import { notFound } from 'next/navigation'

export function CatchAllPage(): JSX.Element {
    notFound()
}
