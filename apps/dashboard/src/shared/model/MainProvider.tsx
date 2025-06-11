'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useMemo } from 'react'
import type { Logger, LoggerOptions } from '@vroomly/utils'
import { createLogger } from '@vroomly/utils'

interface MainProviderProps {
    logger: Logger
    debug: boolean
}

let loggerInstance: Logger | undefined

/**
 * Создаёт новый Logger с переданными опциями.
 * Вызывается только внутри MainContextProvider.
 */
export function initLogger(options: LoggerOptions): Logger {
    loggerInstance = createLogger('Dashboard (vroomly)', options)
    return loggerInstance
}

/**
 * Возвращает уже инициализированный Logger.
 * Бросает ошибку, если Logger ещё не инициализирован.
 */
export function getLogger(): Logger {
    if (!loggerInstance) {
        throw new Error(
            'Logger не инициализирован. Оберните приложение в MainContextProvider.'
        )
    }
    return loggerInstance
}

const Context = createContext<MainProviderProps | null>(null)

function useMainContext(): MainProviderProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Main Context cannot be used out of context.')
    }

    return context
}

export function useLogger(): Logger {
    return useMainContext().logger
}

export function MainProvider({
    children,
    debug,
    logger
}: PropsWithChildren<MainProviderProps>) {
    const value = useMemo(() => ({ debug, logger }), [debug, logger])

    return <Context value={value}>{children}</Context>
}
