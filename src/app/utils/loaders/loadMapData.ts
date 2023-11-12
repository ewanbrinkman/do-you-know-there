import RawMapData from '@typings/data/RawMapData';
import MapArea from '@typings/data/MapArea';
import ProcessedMapData from '@/app/types/data/ProcessedMapData';

export default async function loadMapData(
    area: MapArea,
): Promise<ProcessedMapData> {
    try {
        const module = await import(`@assets/data/areas/${area}/map.json`);
        const rawMapData: RawMapData = module.default;
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
