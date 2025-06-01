import type { PlaceholderProps as TelegramPlaceholderProps } from 'tmaui'

export type PlaceholderProps = Omit<TelegramPlaceholderProps, 'children'>
