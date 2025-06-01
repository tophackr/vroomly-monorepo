import type { EditButtonProps } from '../../model/props'

export interface EditValueContextProps {
    editValue: EditButtonProps
}

export interface EditSetValueContextProps {
    setEditValue: (value?: EditButtonProps) => void
}
