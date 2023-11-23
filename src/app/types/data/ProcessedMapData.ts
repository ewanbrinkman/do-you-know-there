import MapArea from '@typings/data/MapArea';

interface ProcessedMapData {
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
            largeScreen: number;
        };
        min: {
            baseScreen: number;
            smallScreen: number;
            largeScreen: number;
        };
    };
}

export default ProcessedMapData;
