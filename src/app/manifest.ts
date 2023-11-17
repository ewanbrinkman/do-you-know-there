import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Do You Know There?',
        short_name: 'DYKT',
        description: 'A game to test your knowledge of an area.',
        start_url: '/',
        display: 'standalone',
        background_color: '#005234',
        theme_color: '#005234',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
