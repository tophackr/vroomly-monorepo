import type { JSX } from 'react'
import { memo } from 'react'
import { DynamicLottie } from '../DynamicLottie'
import type { LottieProps } from '../types'
import DuckLoading from './DuckLoading.json'

export const DuckLoadingLottie = memo(function DuckLoadingLottie(
    props: LottieProps
): JSX.Element {
    return (
        <DynamicLottie
            animationData={DuckLoading}
            loop={true}
            {...props}
        />
    )
})
