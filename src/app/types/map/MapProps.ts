import BaseMapProps from '@typings/map/BaseMapProps';

interface MapProps extends BaseMapProps {
    clickHandler?: React.FC;
    zoomControl?: boolean;
}

export default MapProps;
