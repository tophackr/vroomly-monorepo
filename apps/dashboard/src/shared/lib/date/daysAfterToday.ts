export function daysAfterToday(value: Date): number {
    const nowDate = new Date()
    const date = new Date(value)

    const diffInMs = date.getTime() - nowDate.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    return diffInDays
}
