export const delay = (ms: number): Promise<unknown> =>
    new Promise(res => setTimeout(res, ms))
