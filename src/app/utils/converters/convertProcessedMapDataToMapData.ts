import MapData from '@/app/types/data/MapData';
import ProcessedMapData from '@/app/types/data/ProcessedMapData';
import ScreenSize from '@typings/data/ScreenSize';

export default function convertProcessedMapDataToMapData(
    processedMapData: ProcessedMapData,
    screenSize: ScreenSize,
): MapData {
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
