import BaseMapProps from '@/app/types/map/BaseMapProps';
import BaseLocationImageProps from '@/app/types/locationImage/BaseLocationImageProps';
import LocationData from '@/app/types/data/LocationData';

interface GameMapProps extends BaseMapProps, BaseLocationImageProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
    onGuess: () => void;
    locationData: LocationData | null;
    guessed: boolean;
    createOrUpdateRemoveGuessMapInfo: (value: () => void) => void;
}

export default GameMapProps;
