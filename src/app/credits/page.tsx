'use client';
import React, { useEffect, useState } from 'react';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';
import secretMessages from '@config/secretMessages.json';

const CreditsPage: React.FC = () => {
    useDeveloperMessage();

    const [creditsText, setCreditsText] = useState('Loading...');

    useEffect(() => {
        setCreditsText(
            'Image credits!'
        );
    }, []);

    return (
        <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="mx-16">
                <h1 className="text-3xl font-bold">Image Credits</h1>
                <p className="whitespace-pre-line">{creditsText}</p>
            </Container>
            <Button href="/">Home</Button>
        </div>
    );
};

export default CreditsPage;
