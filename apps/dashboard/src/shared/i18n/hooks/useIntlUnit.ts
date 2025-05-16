import { useIntlNumber } from './useIntlNumber'

export function useIntlUnit(unit: string): Intl.NumberFormat {
    return useIntlNumber({
        style: 'unit',
        unit
    })
}
