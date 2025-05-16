import { useTranslations } from 'next-intl'
import { Cell, Progress } from '@telegram-apps/telegram-ui'
import type { InteractionCategory } from '@vroomly/prisma'
import { useIntlCurrency } from '@/shared/i18n'
import { getPercent } from '@/shared/lib/number'
import type { TotalCountProps } from './types'

interface CostCellProps extends TotalCountProps {
    title: InteractionCategory
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
