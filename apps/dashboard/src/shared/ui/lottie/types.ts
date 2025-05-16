import type { LottieComponentProps } from 'lottie-react'

export type LottieProps = Omit<LottieComponentProps, 'animationData' | 'loop'>
