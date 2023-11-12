import React from 'react';
import BaseLocationImageProps from '@typings/locationImage/BaseLocationImageProps';

interface GameLocationImageProps extends BaseLocationImageProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default GameLocationImageProps;
