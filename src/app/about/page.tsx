import React from 'react';
import Link from 'next/link';
import Container from '@components/Common/Container';

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-grow flex-col items-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="w-full sm:max-w-3xl">
                <h1 className="text-3xl font-bold">Info</h1>
                <p>
                    A game to test how well you know an area. Guess where each
                    image was taken from (not what the picture is focused on,
                    but where the picture was actually taken).
                </p>
                <p>Made by Ewan Brinkman.</p>
            </Container>
            <Container className="w-full sm:max-w-3xl">
                <h1 className="text-3xl font-bold">Contribute</h1>
                <p>
                    Want to add images to an area, or even suggest a new area?
                    Feel free to open an issue{' '}
                    <Link
                        href="https://github.com/ewanbrinkman/do-you-know-there/issues"
                        className="text-white hover:underline"
                    >
                        here
                    </Link>
                    .
                </p>
            </Container>
            <Container className="w-full sm:max-w-3xl">
                <h1 className="text-3xl font-bold">Developers</h1>
                <p>
                    Source code can be found{' '}
                    <Link
                        href="https://github.com/ewanbrinkman/do-you-know-there"
                        className="text-white hover:underline"
                    >
                        here
                    </Link>{' '}
                    (MIT License) {':)'}
                </p>
            </Container>
        </div>
    );
};

export default AboutPage;
