export const valueAsStringOrNull = (value?: string): string | null =>
    value && value.length > 0 ? value : null
