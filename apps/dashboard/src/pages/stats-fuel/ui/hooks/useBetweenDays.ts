import { oneDayInMs } from '@/shared/model'
import { useFuelInteractions } from './useFuelInteractions'

export function useBetweenDays(): number {
    const interactions = useFuelInteractions()

    const firstInteraction = interactions.at(0)
    const lastInteraction = interactions.at(-1)

    if (interactions.length === 0 || !firstInteraction || !lastInteraction) {
        return 0
    }

    const firstDate = new Date(firstInteraction.date).getTime()
    const lastDate = new Date(lastInteraction.date).getTime()

    const differenceInMilliseconds = firstDate - lastDate
    const differenceInDays = differenceInMilliseconds / oneDayInMs

    return differenceInDays
}
