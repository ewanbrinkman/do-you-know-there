import { CSSProperties } from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}

export default ButtonProps;
