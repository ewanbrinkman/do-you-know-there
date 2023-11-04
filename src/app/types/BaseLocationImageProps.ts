import LocationData from '@typings/LocationData';

interface BaseLocationImageProps {
    region: string;
    id: number;
    locationData: LocationData | null;
    setLocationData: (value: LocationData | null) => void;
}

export default BaseLocationImageProps;
