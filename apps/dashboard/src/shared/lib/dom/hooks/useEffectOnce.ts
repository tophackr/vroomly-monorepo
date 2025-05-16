'use client'

import { useEffect, useRef } from 'react'

export function useEffectOnce(fn: () => void): void {
    const canCall = useRef(true)

    useEffect(() => {
        if (canCall.current) {
            canCall.current = false
            fn()
        }
    }, [fn])
}
