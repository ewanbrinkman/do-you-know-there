interface MapData {
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

export default MapData;
