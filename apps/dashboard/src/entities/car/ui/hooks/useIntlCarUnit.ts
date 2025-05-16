import type { OdometerUnits } from '@vroomly/prisma'
import { useIntlUnit } from '@/shared/i18n'

export const useIntlCarUnit = (value: number, units: OdometerUnits) =>
    useIntlUnit(units).format(value)
