import type { ReactNode } from 'react'

export interface ISegment {
    key: string
    label: string
    Component: ReactNode
}

export interface SegmentProps {
    segments: ISegment[]
    defaultSegment: string
}
