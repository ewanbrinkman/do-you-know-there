import MapArea from '@/app/types/data/MapArea';

interface LocationData {
    area: MapArea;
    id: number;
    filename: string;
    name: string;
    difficulty: number;
    hint: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    keywords: string[];
}

export default LocationData;
