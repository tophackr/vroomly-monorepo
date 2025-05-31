import type { JSX } from 'react'
import { memo } from 'react'
import Lottie from 'lottie-react'
import type { LottieProps } from '../types'
import DuckLoading from './DuckLoading.json'

export const DuckLoadingLottie = memo(function DuckLoadingLottie(
    props: LottieProps
): JSX.Element {
    return (
        <Lottie
            animationData={DuckLoading}
            loop={true}
            {...props}
        />
    )
})
