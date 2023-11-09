import MapArea from '@/app/types/data/MapArea';

interface MapData {
    area: MapArea;
    center: {
        lat: number;
        lng: number;
    };
    maxBounds: {
        southwest: {
            lat: number;
            lng: number;
        };
        northeast: {
            lat: number;
            lng: number;
        };
    };
    zoom: {
        initial: {
            baseScreen: number;
            smallScreen: number;
        };
        min: {
            baseScreen: number;
            smallScreen: number;
        };
    };
}

export default MapData;
