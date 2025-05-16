'use client'

import type { UseDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

export const useAppDispatch: UseDispatch<AppDispatch> =
    useDispatch.withTypes<AppDispatch>()
