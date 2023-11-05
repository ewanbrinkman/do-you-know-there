import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container flex justify-start items-center">
                <Link
                    href="/"
                    className="text-white text-xl font-semibold hover:underline"
                >
                    Home
                </Link>
                <Link
                    href="/play"
                    className="text-white text-xl font-semibold hover:underline ml-16"
                >
                    Play
                </Link>
                <Link
                    href="/contribute"
                    className="text-white text-xl font-semibold hover:underline ml-16"
                >
                    Contribute
                </Link>
                <Link
                    href="/about"
                    className="text-white text-xl font-semibold hover:underline ml-16"
                >
                    About
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
