import BaseMapProps from '@/app/types/map/BaseMapProps';
import BaseLocationImageProps from '@/app/types/locationImage/BaseLocationImageProps';
import LocationData from '@/app/types/data/LocationData';
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
