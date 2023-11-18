import BaseMapProps from '@typings/map/BaseMapProps';
import BaseLocationImageProps from '@typings/locationImage/BaseLocationImageProps';
import LocationData from '@typings/data/LocationData';
import LocationResult from '@typings/game/LocationResult';

interface GameMapProps extends BaseMapProps, BaseLocationImageProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
    onGuess: () => void;
    locationData: LocationData | null;
    guessed: boolean;
    createOrUpdateRemoveGuessMapInfo: (value: () => void) => void;
    addLocationResult: (value: LocationResult) => void;
}

export default GameMapProps;
