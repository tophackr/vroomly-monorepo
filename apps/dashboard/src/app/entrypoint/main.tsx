import '@telegram-apps/telegram-ui/dist/styles.css'
import 'normalize.css/normalize.css'
import '../styles/globals.css'
import { StrictMode } from 'react'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { init } from './tma/init'
import './tma/mocks/mockEnv'

// eslint-disable-next-line unicorn/prefer-query-selector
const root = createRoot(document.getElementById('root')!)

try {
    const launchParams = retrieveLaunchParams()
    const { tgWebAppPlatform: platform, tgWebAppStartParam } = launchParams
    const debug =
        (tgWebAppStartParam || '').includes('debug') || import.meta.env.DEV

    // Configure all application dependencies.
    await init({
        debug,
        eruda: debug && ['ios', 'android'].includes(platform),
        mockForMacOS: platform === 'macos'
    }).then(() => {
        root.render(
            <StrictMode>
                <App />
            </StrictMode>
        )
    })
} catch {
    //root.render(<EnvUnsupported />)
}
