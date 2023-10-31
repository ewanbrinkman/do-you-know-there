import BaseMapProps from '@typings/BaseMapProps';

interface GameMapProps extends BaseMapProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default GameMapProps;
