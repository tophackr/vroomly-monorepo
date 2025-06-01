import type { JSX } from 'react'
import { memo } from 'react'
import Lottie from 'lottie-react'
import type { LottieProps } from '../types'
import DuckNotFound from './DuckNotFound.json'

export const DuckNotFoundLottie = memo(function DuckNotFoundLottie(
    props: LottieProps
): JSX.Element {
    return (
        <Lottie
            animationData={DuckNotFound}
            loop={true}
            {...props}
        />
    )
})
