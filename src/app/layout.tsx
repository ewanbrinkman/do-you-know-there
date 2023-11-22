import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@styles/globals.css';
import Navbar from '@components/Layouts/Navbar';
import metadataConfig from '@config/metadata.json';

const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://doyouknowthere.com'
        : `http://localhost:${process.env.PORT || 3000}`;

export const metadata: Metadata = {
    title: metadataConfig.title.base,
    description: metadataConfig.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
        title: metadataConfig.title.base,
        description: metadataConfig.description,
        url: baseUrl,
        siteName: metadataConfig.title.base,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col h-dscreen">
                <Navbar />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
