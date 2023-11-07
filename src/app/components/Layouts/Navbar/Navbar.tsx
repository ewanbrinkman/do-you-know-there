import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-secondary-color p-4">
            <div className="container flex justify-start items-center">
                <Link
                    href="/"
                    className="text-primary-color text-xl font-semibold hover:underline"
                >
                    Home
                </Link>
                <Link
                    href="/play"
                    className="text-primary-color text-xl font-semibold hover:underline ml-16"
                >
                    Play
                </Link>
                <Link
                    href="/about"
                    className="text-primary-color text-xl font-semibold hover:underline ml-16"
                >
                    About
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
