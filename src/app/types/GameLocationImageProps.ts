import React from 'react';
import BaseLocationImageProps from "@typings/BaseLocationImageProps";

interface GameLocationImageProps extends BaseLocationImageProps {
    region: string;
    minimized: boolean;
    setMinimized: (value: boolean) => void;
    containerRef: React.RefObject<HTMLElement | null>;
}

export default GameLocationImageProps;
