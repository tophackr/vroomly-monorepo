'use client'

import { useCallback, useEffect, useRef } from 'react'

export function useEffectOnce(fn: () => void): void {
    const canCall = useRef(true)

    const callback = useCallback(() => fn(), [fn])

    useEffect(() => {
        if (canCall.current) {
            canCall.current = false
            callback()
        }
    }, [callback])
}
