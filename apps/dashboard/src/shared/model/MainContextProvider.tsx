'use client'

import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { Logger, LoggerOptions } from '@vroomly/utils'
import { createLogger } from '@vroomly/utils'

interface MainContextProviderProps {
    logger: Logger
}

let loggerInstance: Logger | undefined

/**
 * Создаёт новый Logger с переданными опциями.
 * Вызывается только внутри MainContextProvider.
 */
function initLogger(options: LoggerOptions): Logger {
    loggerInstance = createLogger('Dashboard', options)
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

const Context = createContext<MainContextProviderProps | null>(null)

function useMainContext(): MainContextProviderProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Main Context cannot be used out of context.')
    }

    return context
}

export function useLogger() {
    return useMainContext().logger
}

export function MainContextProvider({ children }: PropsWithChildren) {
    const logger = initLogger({
        bgColor: '#059669',
        textColor: 'white',
        // todo: make debug
        shouldLog: true
    })
    return <Context.Provider value={{ logger }}>{children}</Context.Provider>
}
