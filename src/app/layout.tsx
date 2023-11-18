import type { Metadata } from 'next';
import '@styles/globals.css';
import Navbar from '@components/Layouts/Navbar';
import metadataConfig from '@config/metadata.json';

export const metadata: Metadata = {
    title: metadataConfig.title.base,
    description: metadataConfig.description,
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
            </body>
        </html>
    );
}
