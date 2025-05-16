export function getIntlPartType(
    intl: Intl.NumberFormat,
    type: keyof Intl.NumberFormatPartTypeRegistry
): string | undefined {
    return intl.formatToParts(0).find(part => part.type === type)?.value
}
