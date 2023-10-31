import BaseLocationImageProps from "@typings/BaseLocationImageProps";
import { CSSProperties } from "react";

interface LocationImageProps extends BaseLocationImageProps {
    size: number;
    priority?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    style?: CSSProperties;
}

export default LocationImageProps;
