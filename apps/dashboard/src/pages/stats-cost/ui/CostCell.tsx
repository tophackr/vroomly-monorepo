'use client'

import type { InteractionType } from '@vroomly/prisma'
import { Cell, Progress } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useIntlCurrency } from '@/shared/i18n'
import { getPercent } from '@/shared/lib/number'
import type { TotalCountProps } from './props'

interface CostCellProps extends TotalCountProps {
    title: InteractionType
    value: number
}

export function CostCell({ title, value, totalCount }: CostCellProps) {
    const t = useTranslations('CarCategoryName')

    const currency = useIntlCurrency().format(value)

    return (
        <Cell
            subhead={t(title)}
            subtitle={`${getPercent(value, totalCount)} %`}
            description={<Progress value={getPercent(value, totalCount)} />}
        >
            {currency}
        </Cell>
    )
}
