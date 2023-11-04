import BaseMapProps from '@typings/BaseMapProps';
import LocationData from '@typings/LocationData';

interface GameMapProps extends BaseMapProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
    onGuess: () => void;
    locationData: LocationData | null;
    // canGuess: () => boolean;
    guessed: boolean;
    createOrUpdateRemoveGuessMapInfo: (value: () => void) => void;
}

export default GameMapProps;
