'use client';
import React from 'react';
import Link from 'next/link';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';
import useDeveloperMessage from '@hooks/useDeveloperMessage';

const AboutPage: React.FC = () => {
    useDeveloperMessage();

    return (
        <div className="flex flex-grow flex-col items-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="w-full sm:max-w-4xl mx-16">
                <h1 className="text-3xl font-bold">Info</h1>
                <p>
                    A game to test how well you know an area. For each image,
                    guess where the photographer was standing.
                </p>
                <p>Made by Ewan Brinkman.</p>
            </Container>
            <Container className="w-full sm:max-w-4xl mx-16">
                <h1 className="text-3xl font-bold">Contribute</h1>
                <p>
                    Want to add images to an area or even suggest a new area?
                    Want to report a bug or request a feature? Feel free to open
                    an issue{' '}
                    <Link
                        href="https://github.com/ewanbrinkman/do-you-know-there/issues"
                        className="text-white hover:underline"
                    >
                        here
                    </Link>
                    .
                </p>
            </Container>
            <Container className="w-full sm:max-w-4xl mx-16">
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
            <Button href="/secret">Secret Button</Button>
        </div>
    );
};

export default AboutPage;
