import { CSSProperties } from 'react';

interface ButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
}

export default ButtonProps;
