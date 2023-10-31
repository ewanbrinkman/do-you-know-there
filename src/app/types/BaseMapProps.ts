import MapType from '@typings/MapType';

interface BaseMapProps {
    mapType: MapType;
    className?: string;
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default BaseMapProps;
