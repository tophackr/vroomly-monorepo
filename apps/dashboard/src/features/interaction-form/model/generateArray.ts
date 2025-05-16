export function generateArray(
    start: number,
    step: number,
    length: number
): number[] {
    return Array.from({ length }, (_, i) => start + i * step)
}
