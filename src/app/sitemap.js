export const dynamic = 'force-static';

export default function sitemap() {
    return [
        {
            url: 'https://harouna.fr',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://harouna.fr/portfolio',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://harouna.fr/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]
}
