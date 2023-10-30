import MapType from '@typings/MapType';

interface MapProps {
    mapType: MapType;
    className?: string;
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default MapProps;
