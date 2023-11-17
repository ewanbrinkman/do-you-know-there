import { MetadataRoute } from 'next';

const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://doyouknowthere.com'
        : 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/play`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
