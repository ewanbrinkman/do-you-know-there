import MapArea from '@typings/data/MapArea';
import MapInfo from '@typings/data/MapInfo';

export default async function loadMapInfo(area: MapArea): Promise<MapInfo> {
    try {
        const module = await import(`@assets/data/areas/${area}/info.json`);
        return module.default;
    } catch (error) {
        console.error(`Failed to load area info for area ${area}.`);
        throw error;
    }
}
