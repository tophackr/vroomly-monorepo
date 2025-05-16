import type { JSX } from 'react'
import { memo } from 'react'
import { DynamicLottie } from '../DynamicLottie'
import type { LottieProps } from '../types'
import DuckFlashback from './DuckFlashback.json'

export const DuckFlashbackLottie = memo(function DuckFlashbackLottie(
    props: LottieProps
): JSX.Element {
    return (
        <DynamicLottie
            animationData={DuckFlashback}
            loop={true}
            {...props}
        />
    )
})
