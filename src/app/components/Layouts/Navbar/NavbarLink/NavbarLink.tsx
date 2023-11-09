import Link from 'next/link';
import NavbarLinkProps from '@typings/navbar/NavbarLinkProps';

const NavbarLink: React.FC<NavbarLinkProps> = (props: NavbarLinkProps) => {
    return (
            <Link
                href={props.href}
                className="text-primary-color text-xl font-semibold hover:underline mx-8"
            >
                {props.children}
            </Link>
    );
};

export default NavbarLink;
