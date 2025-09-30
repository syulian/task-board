import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextIntl = createNextIntlPlugin('./src/shared/config/i18n/request.ts');

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/*/**',
                search: '',
            },
        ],
    },
};

export default nextIntl(nextConfig);
