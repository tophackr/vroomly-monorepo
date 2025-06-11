import 'tmaui/tmaui.css'
import 'normalize.css/normalize.css'
import '../styles/globals.css'
import { StrictMode } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { createRoot } from 'react-dom/client'
import { initLogger, MainProvider } from '@/shared/model'
import { App } from './App'
import { init } from './tma/init'
import './tma/mocks/mockEnv'

const root = createRoot(document.querySelector('#app'))

try {
    const launchParams = retrieveLaunchParams()
    const { tgWebAppPlatform: platform, tgWebAppStartParam } = launchParams
    const debug =
        (tgWebAppStartParam || '').includes('debug') || import.meta.env.DEV
    const logger = initLogger({
        bgColor: '#059669',
        textColor: 'white',
        shouldLog: debug
    })

    // Configure all application dependencies.
    await init({
        debug,
        eruda: debug && ['ios', 'android'].includes(platform),
        mockForMacOS: platform === 'macos'
    }).then(() => {
        root.render(
            <StrictMode>
                <MainProvider
                    debug={debug}
                    logger={logger}
                >
                    <App />
                </MainProvider>
            </StrictMode>
        )
    })
} catch {
    //root.render(<EnvUnsupported />)
}
