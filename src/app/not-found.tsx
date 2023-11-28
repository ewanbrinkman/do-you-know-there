'use client';
import React, { useEffect, useState } from 'react';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';
import secretMessages from '@config/secretMessages.json';

const NotFoundPage: React.FC = () => {
    useDeveloperMessage();

    const secretMessageDefault = '...';

    const [secretMessage, setSecretMessage] = useState(secretMessageDefault);

    useEffect(() => {
        setSecretMessage(
            secretMessages.length > 0
                ? secretMessages[
                      Math.floor(Math.random() * secretMessages.length)
                  ]
                : secretMessageDefault,
        );
    }, []);

    return (
        <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="mx-16">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                <p className="whitespace-pre-line">{secretMessage}</p>
            </Container>
            <Button href="/">Home</Button>
        </div>
    );
};

export default NotFoundPage;
