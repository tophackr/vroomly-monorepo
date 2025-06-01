import type { JSX } from 'react'
import { memo } from 'react'
import Lottie from 'lottie-react'
import type { LottieProps } from '../types'
import DuckFlashback from './DuckFlashback.json'

export const DuckFlashbackLottie = memo(function DuckFlashbackLottie(
    props: LottieProps
): JSX.Element {
    return (
        <Lottie
            animationData={DuckFlashback}
            loop={true}
            {...props}
        />
    )
})
