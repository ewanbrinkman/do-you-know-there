import MapArea from '@typings/data/MapArea';

interface LocationData {
    area: MapArea;
    id: string;
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
