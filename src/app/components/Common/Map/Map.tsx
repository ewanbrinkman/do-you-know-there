import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapConfig from '@config/map.json';
import type MapProps from '@typings/map/MapProps';

const Map: React.FC<MapProps> = (props: MapProps) => {
    const ClickHandler = props.clickHandler;

    return props.mapData ? (
        <MapContainer
            ref={props.mapRef}
            className={props.className}
            center={[props.mapData.center.lat, props.mapData.center.lng]}
            zoom={props.mapData.zoom.initial}
            zoomControl={
                props.zoomControl === undefined ? true : props.zoomControl
            }
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
            {props.children}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url={mapConfig.url}
            />
            {ClickHandler !== undefined && <ClickHandler />}
        </MapContainer>
    ) : null;
};

export default Map;
