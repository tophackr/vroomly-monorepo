export function reduceSumItems<T>(items: T[], value: keyof T): number {
    let sum = 0

    for (const item of items) {
        const itemValue = item[value]

        if (!['undefined', 'number'].includes(typeof itemValue)) {
            throw new Error(
                `${value.toString()} is not type of Number. Is type '${typeof itemValue}'.`
            )
        }

        sum += (itemValue as number) ?? 0
    }

    return sum
}
