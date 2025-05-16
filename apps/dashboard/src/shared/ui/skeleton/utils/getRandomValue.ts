export function getRandomValue(long: boolean = false): number {
    const [min, max] = long ? [24, 48] : [16, 32]
    const step = 4
    const values = Array.from(
        { length: (max - min) / step + 1 },
        (_, i) => min + i * step
    )

    const randomIndex = Math.floor(Math.random() * values.length)
    return values[randomIndex] ?? min
}
