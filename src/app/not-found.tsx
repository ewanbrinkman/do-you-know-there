'use client';
import React from 'react';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';

const Home: React.FC = () => {
    useDeveloperMessage();

    return (
        <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="mx-16">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </Container>
            <Button href="/">Home</Button>
        </div>
    );
};

export default Home;
