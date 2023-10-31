import BaseLocationImageProps from "@typings/BaseLocationImageProps";

interface LocationImageProps extends BaseLocationImageProps {
    size: number;
    priority?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
}

export default LocationImageProps;
