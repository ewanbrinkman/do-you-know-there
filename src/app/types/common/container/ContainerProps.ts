import { CSSProperties } from 'react';

export default interface ContainerProps {
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}
