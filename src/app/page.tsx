import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Do you know there?</h1>
            <Link href="/play">
                <button>Play</button>
            </Link>
        </div>
    );
};

export default Home;
