import LocationImageProps from '@typings/LocationImageProps';

interface GameLocationImageProps extends LocationImageProps {
    region: string;
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default GameLocationImageProps;
