import BaseMapProps from '@typings/map/BaseMapProps';
import BaseLocationImageProps from '@typings/locationImage/BaseLocationImageProps';
import LocationData from '@typings/data/LocationData';
import L from 'leaflet';

interface GameMapProps extends BaseMapProps, BaseLocationImageProps {
    minimized: boolean;
    setMinimized: (value: boolean) => void;
    onPlaceMarker: () => void;
    locationData: LocationData | null;
    guessed: boolean;
    guessMarkerCoordinates: L.LatLngExpression | null;
    setGuessMarkerCoordinates: (value: L.LatLngExpression) => void;
}

export default GameMapProps;
