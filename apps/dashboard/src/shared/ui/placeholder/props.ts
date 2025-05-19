import type { PlaceholderProps as TelegramPlaceholderProps } from '@telegram-apps/telegram-ui'

export type PlaceholderProps = Omit<TelegramPlaceholderProps, 'children'>
