import { deepOmitBy } from './deepOmitBy'

export function removeEmptyValues<T extends object>(
    obj: T,
    removeZero: boolean = false
): T {
    const emptyArr = [null, Number.NaN, undefined, '']

    if (removeZero) {
        emptyArr.push(0)
    }

    return deepOmitBy(obj, value =>
        emptyArr.includes(
            value as unknown as string | number | null | undefined
        )
    )
}
