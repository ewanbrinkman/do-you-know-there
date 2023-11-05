import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapConfig from '@config/map.json';
import type MapProps from '@/app/types/map/MapProps';

const Map: React.FC<MapProps> = (props: MapProps) => {
    const ClickHandler = props.clickHandler;

    return props.mapData ? (
        <MapContainer
            className={props.className}
            center={[props.mapData.center.lat, props.mapData.center.lng]}
            zoom={props.mapData.zoom.initial}
            scrollWheelZoom={true}
            maxBounds={[
                [
                    props.mapData.maxBounds.southwest.lat,
                    props.mapData.maxBounds.southwest.lng,
                ],
                [
                    props.mapData.maxBounds.northeast.lat,
                    props.mapData.maxBounds.northeast.lng,
                ],
            ]}
            minZoom={props.mapData.zoom.min}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={mapConfig.url}
            />
            {ClickHandler !== undefined && <ClickHandler />}
        </MapContainer>
    ) : null;
};

export default Map;
