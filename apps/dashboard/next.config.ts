import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts')

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
export default withNextIntl(nextConfig)
