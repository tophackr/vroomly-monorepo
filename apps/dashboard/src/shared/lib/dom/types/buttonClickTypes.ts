interface BaseClickEvent {
    disabled: boolean
}

interface MouseClickBaseEvent extends BaseClickEvent {
    onClick: () => void
}

interface MouseClickPromiseEvent extends BaseClickEvent {
    onClick: () => Promise<void>
}

interface MouseClickDataEvent<T> extends BaseClickEvent {
    onClick: (data: T) => void
}

interface MouseClickDataPromiseEvent<T> extends BaseClickEvent {
    onClick: (data: T) => Promise<void>
}

export type MouseClickEvent<T = MouseEvent> =
    | MouseClickBaseEvent
    | MouseClickPromiseEvent
    | MouseClickDataEvent<T>
    | MouseClickDataPromiseEvent<T>
