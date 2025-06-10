import type { JSX } from 'react'

export function Loader(): JSX.Element {
    return (
        <div className='flex min-h-screen items-center justify-center size-5'>
            <img
                src='/images/Duck-Loading.webp'
                alt='Loading...'
                width={144}
                height={144}
                loading='lazy'
                decoding='async'
            />
        </div>
    )
}
