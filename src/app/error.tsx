'use client';
import React from 'react';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import Container from '@components/Common/Container';

const Home: React.FC = () => {
    useDeveloperMessage();

    return (
        <div className="flex flex-grow flex-col items-center justify-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="mx-16">
                <h1 className="text-3xl font-bold">An error occurred.</h1>
            </Container>
        </div>
    );
};

export default Home;
