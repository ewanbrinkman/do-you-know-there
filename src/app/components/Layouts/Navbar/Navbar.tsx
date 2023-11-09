import NavbarLink from '@components/Layouts/Navbar/NavbarLink';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-secondary-color p-4">
            <div className="flex justify-between sm:justify-start items-center">
                <NavbarLink href="/">Home</NavbarLink>
                <NavbarLink href="/play">Play</NavbarLink>
                <NavbarLink href="/about">About</NavbarLink>
            </div>
        </nav>
    );
};

export default Navbar;
