'use client'

import { useMemo } from 'react'
import type { ActionCreatorsMapObject } from 'redux'
import { bindActionCreators } from 'redux'
import { useAppDispatch } from './useAppDispatch'

export function useActions<T extends ActionCreatorsMapObject>(
    actionCreators: T
): T {
    const dispatch = useAppDispatch()
    const actions = useMemo(() => actionCreators, [actionCreators])

    return useMemo(
        () => bindActionCreators(actions, dispatch),
        [actions, dispatch]
    )
}
