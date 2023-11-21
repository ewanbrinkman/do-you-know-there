import MapData from '@typings/data/MapData';
import L from 'leaflet';

interface BaseMapProps {
    mapData: MapData | null;
    className?: string;
    mapRef?: React.MutableRefObject<L.Map | null>;
}

export default BaseMapProps;
