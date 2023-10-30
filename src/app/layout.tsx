import type { Metadata } from 'next';
import '@styles/globals.css';
import Navbar from '@components/Layouts/Navbar';

export const metadata: Metadata = {
    title: 'Do You Know There',
    description: 'A game to test your knowledge of an area.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className='flex flex-col h-screen'>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
