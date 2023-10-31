import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">Home</Link>
                <Link href="/play">Play</Link>
                <Link href="/contribute">Contribute</Link>
                <Link href="/developers">Developers</Link>
                <Link href="/admin">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
