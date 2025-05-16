export function when<C extends boolean, K extends string, V>(
    condition: C,
    key: K,
    value: V
): C extends true ? { [O in K]: V } : object {
    return (condition ? { [key]: value } : {}) as C extends true
        ? { [O in K]: V }
        : object
}

export function whenAll<C extends boolean, T extends Record<string, unknown>>(
    condition: C,
    values: T
): C extends true ? T : object {
    return (condition ? values : {}) as C extends true ? T : object
}

export function inputErrorStatus(condition: unknown):
    | object
    | {
          status: 'error'
      } {
    return when(!!condition, 'status', 'error' as const)
}
