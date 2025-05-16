import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line no-commented-code/no-commented-code
/**
 * Combines the clsx and tailwind-merge libraries to create a utility function
 * that merges class names and resolves conflicts between Tailwind CSS classes.
 *
 * @param {ClassValue[]} args - Class names to be merged.
 * @returns {string} A single string of merged class names.
 */
export function cx(...args: ClassValue[]): string {
    return twMerge(clsx(...args))
}
