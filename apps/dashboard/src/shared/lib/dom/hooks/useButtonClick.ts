'use client'

import type { MouseEvent } from 'react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import type { MouseClickEvent } from '../types/buttonClickTypes'

type UseButtonClickProps<T> =
    | {
          route?: string
          callback?: (data?: T) => unknown
      }
    | {
          route?: string
          callback?: (data: T) => unknown
      }

export function useButtonClick<T = MouseEvent>({
    route,
    callback
}: UseButtonClickProps<T>): MouseClickEvent<T> {
    const navigate = useNavigate()

    const [disabled, setDisabled] = useState(false)

    const onClick = useCallback(
        async (data?: T) => {
            if (disabled) {
                return
            }

            setDisabled(true)

            if (callback) {
                await callback(data as T)
            }

            if (route) {
                await navigate(route)
            }
        },
        [callback, disabled, route, navigate]
    )

    return { disabled, onClick }
}
