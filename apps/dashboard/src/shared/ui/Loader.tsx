import type { JSX } from 'react'
import Image from 'next/image'

export function Loader(): JSX.Element {
    return (
        <div className={'flex min-h-screen items-center justify-center'}>
            <Image
                src={'/images/Duck-Loading.webp'}
                alt={'Loading...'}
                width={144}
                height={144}
                unoptimized={true}
                priority={true}
            />
        </div>
    )
}
