import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                pathname: '/color/**'
            }
        ]
    }
}

// eslint-disable-next-line import/no-default-export
export default nextConfig
