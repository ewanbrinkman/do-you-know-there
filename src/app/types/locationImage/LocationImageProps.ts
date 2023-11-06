import BaseLocationImageProps from '@/app/types/locationImage/BaseLocationImageProps';
import { CSSProperties } from 'react';

interface LocationImageProps extends BaseLocationImageProps {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    style?: CSSProperties;
}

export default LocationImageProps;
