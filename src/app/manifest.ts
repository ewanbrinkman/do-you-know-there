import { MetadataRoute } from 'next';
import metadataConfig from '@config/metadata.json';
import themeConfig from '@config/theme.json';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: metadataConfig.title.base,
        short_name: metadataConfig.title.short,
        description: metadataConfig.description,
        start_url: '/',
        display: 'standalone',
        background_color: themeConfig.color.secondary.base,
        theme_color: themeConfig.color.secondary.base,
        icons: [
            {
                src: '/favicon.ico',
                sizes: '48x48 32x32 16x16',
                type: 'image/x-icon',
            },
        ],
    };
}
