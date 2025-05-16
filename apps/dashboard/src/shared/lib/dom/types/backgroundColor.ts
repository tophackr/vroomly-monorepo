import type { CSSProperties } from 'react'

export type BackgroundColor = Exclude<
    CSSProperties['backgroundColor'],
    undefined
>
