import RawMapData from '@typings/data/RawMapData';
import MapArea from '@typings/data/MapArea';
import ProcessedMapData from '@typings/data/ProcessedMapData';

export default async function loadMapData(
    area: MapArea,
): Promise<ProcessedMapData> {
    try {
        const rawMapData: RawMapData = (
            await import(`@assets/data/areas/${area}/map.json`)
        ).default;
        const newMapData: ProcessedMapData = {
            ...rawMapData,
            area: area,
        };
        return newMapData;
    } catch (error) {
        console.error(`Failed to load map data for area ${area}.`);
        throw error;
    }
}
