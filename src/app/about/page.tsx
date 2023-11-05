import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">About</h1>
            <p className="text-gray-700 mb-4">
                A game to test how well you know an area. Guess where each image
                from an area was taken from.
            </p>
        </div>
    );
};

export default AboutPage;
