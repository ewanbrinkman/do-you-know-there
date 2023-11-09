import React from 'react';
import ButtonProps from '@typings/common/button/ButtonProps';
import Link from 'next/link';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const baseClassName: string =
        'pointer-events-auto text-white bg-tertiary-color py-2 px-4 transition duration-300 ease-in-out hover:bg-tertiary-color-dark focus:bg-tertiary-color-dark text-2xl rounded-3xl';

    return props.href ? (
        <Link
            href={props.href}
            className={`${baseClassName} ${props.className}`}
            onClick={props.onClick}
            style={props.style}
        >
            {props.text}
        </Link>
    ) : (
        <button
            className={`${baseClassName} ${props.className}`}
            onClick={props.onClick}
            style={props.style}
        >
            {props.text}
        </button>
    );
};

export default Button;
