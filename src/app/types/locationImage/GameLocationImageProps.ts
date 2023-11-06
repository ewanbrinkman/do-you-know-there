import React from 'react';
import BaseLocationImageProps from '@/app/types/locationImage/BaseLocationImageProps';

interface GameLocationImageProps extends BaseLocationImageProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default GameLocationImageProps;
