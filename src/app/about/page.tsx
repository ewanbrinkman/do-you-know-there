import React from 'react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
    return (
        <div
            // className="flex flex-grow flex-col bg-gradient-to-r from-white via-primary-color to-secondary-color"
            className="flex flex-grow flex-col items-center p-4"
            style={{ background: 'linear-gradient(180deg, #ffffff, #baffe6)' }}
        >
            {/* <h1 className="text-3xl font-bold mb-4">About</h1> */}
            {/* <p className="">
                A game to test how well you know an area. Guess where each image
                from an area was taken from.
            </p> */}
            <h1 className="text-3xl font-bold mb-8 text-primary-color bg-secondary-color rounded-lg p-4 mx-16">
                About
            </h1>
            <p className="mb-16 text-center text-primary-color bg-secondary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                A game to test how well you know an area. Guess where each image
                from an area was taken from.
            </p>
            <p className="mb-16 text-center text-primary-color bg-secondary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                Made by Ewan Brinkman.
            </p>
            <h1 className="text-3xl font-bold mb-8 text-primary-color bg-secondary-color rounded-lg p-4 mx-16">
                Contribute
            </h1>
            <p className="mb-16 text-center text-primary-color bg-secondary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                Want to add an area or images to an area? Feel free to open an
                issue{' '}
                <Link href="https://github.com/ewanbrinkman/do-you-know-there/issues">
                    here
                </Link>
                .
            </p>
            <h1 className="text-3xl font-bold mb-8 text-primary-color bg-secondary-color rounded-lg p-4 mx-16">
                Developers
            </h1>
            <p className="mb-16 text-center text-primary-color bg-secondary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                Source code is on GitHub{' '}
                <Link href="https://github.com/ewanbrinkman/do-you-know-there">
                    here
                </Link>{' '}
                (MIT License) :)
            </p>
            <div className="bg-secondary-color rounded-lg flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8 text-primary-color p-4 mx-16">
                    Test Title
                </h1>
                <p className="mb-16 text-center text-primary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                    Adasdasd asdjk ndasfsdf asdfj asdasdfh asdf iuasd iuoadsoui
                    asuhifas iudhs adiu uhsaiduhidfs iuasdi dsfauihdfsasad.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
