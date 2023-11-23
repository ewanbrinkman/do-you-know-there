import MapData from '@typings/data/MapData';
import ProcessedMapData from '@typings/data/ProcessedMapData';
import ScreenSize from '@typings/data/ScreenSize';

export default function getMapData(
    processedMapData: ProcessedMapData,
    screenWidth: number,
): MapData {
    let screenSize: ScreenSize = ScreenSize.Small;

    if (screenWidth >= 3100) {
        screenSize = ScreenSize.Large;
    } else if (screenWidth >= 800) {
        screenSize = ScreenSize.Base;
    }

    return {
        area: processedMapData.area,
        center: {
            lat: processedMapData.center.lat,
            lng: processedMapData.center.lng,
        },
        maxBounds: {
            southwest: {
                lat: processedMapData.maxBounds.southwest.lat,
                lng: processedMapData.maxBounds.southwest.lng,
            },
            northeast: {
                lat: processedMapData.maxBounds.northeast.lat,
                lng: processedMapData.maxBounds.northeast.lng,
            },
        },
        zoom: {
            initial: processedMapData.zoom.initial[screenSize],
            min: processedMapData.zoom.min[screenSize],
        },
    };
}
