import BaseMapProps from '@typings/map/BaseMapProps';

interface MapProps extends BaseMapProps {
    clickHandler?: React.FC;
    zoomControl?: boolean;
    children?: React.ReactNode;
}

export default MapProps;
