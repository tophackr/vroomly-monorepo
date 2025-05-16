/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */

export const callMultiple =
    (...fns: any) =>
    (...args: any) =>
        fns
            .filter((f: any) => typeof f === 'function')
            // eslint-disable-next-line unicorn/no-array-for-each
            .forEach((f: any) => f(...args))
