import {
    bindThemeParamsCssVars,
    bindViewportCssVars,
    init as initSDK,
    isThemeParamsCssVarsBound,
    miniAppReady,
    mountBackButton,
    mountMiniAppSync,
    mountSettingsButton,
    mountThemeParamsSync,
    mountViewport,
    restoreInitData,
    setDebug,
    targetOrigin
} from '@telegram-apps/sdk-react'
import { mockMacOs } from './mocks/mockMacOs'

interface InitProps {
    debug: boolean
    eruda: boolean
    mockForMacOS: boolean
}

/**
 * Initializes the application and configures its dependencies.
 */
export async function init({
    debug,
    eruda,
    mockForMacOS
}: InitProps): Promise<void> {
    // Set @telegram-apps/sdk-react debug mode.
    setDebug(debug)
    targetOrigin.set('https://tgl.mini-apps.store')

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK()
    miniAppReady()

    // Add Eruda if needed.
    if (eruda) {
        void import('eruda').then(({ default: lib }) => {
            lib.init()
            lib.position({ x: window.innerWidth - 50, y: 0 })
        })
    }

    // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
    // even response to the "web_app_request_theme" method. It also generates an incorrect
    // event for the "web_app_request_safe_area" method.
    if (mockForMacOS) mockMacOs()

    // Initialize required components.
    restoreInitData()

    mountBackButton.ifAvailable()
    mountSettingsButton.ifAvailable()

    mountMiniAppSync.ifAvailable()

    // Mount all components used in the project.
    if (mountThemeParamsSync.isAvailable()) {
        mountMiniAppSync()
        if (!isThemeParamsCssVarsBound()) bindThemeParamsCssVars()
    }

    await Promise.all([
        mountViewport.isAvailable() &&
            mountViewport().then(() => {
                bindViewportCssVars()
            })
    ])
}
