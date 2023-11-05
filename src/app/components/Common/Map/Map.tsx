'use client';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapConfig from '@config/map.json';
import type MapProps from '@/app/types/map/MapProps';
import type MapData from '@/app/types/data/MapData';
import type MapType from '@/app/types/data/MapArea';

const Map: React.FC<MapProps> = (props: MapProps) => {
    const [mapType, setMapType] = useState<MapType>(props.area);
    const [mapData, setMapData] = useState<MapData | null>(null);

    useEffect(() => {
        import(`@assets/data/areas/${mapType}/map.json`)
            .then((module) => {
                setMapData(module.default);
            })
            .catch((error) => {
                console.error(`Failed to load map data: ${error}`);
            });
    }, [mapType]);

    const ClickHandler = props.clickHandler;

    return mapData ? (
        <MapContainer
            className={props.className}
            center={[mapData.center.lat, mapData.center.lng]}
            zoom={mapData.zoom.initial}
            scrollWheelZoom={true}
            maxBounds={[
                [
                    mapData.maxBounds.southwest.lat,
                    mapData.maxBounds.southwest.lng,
                ],
                [
                    mapData.maxBounds.northeast.lat,
                    mapData.maxBounds.northeast.lng,
                ],
            ]}
            minZoom={mapData.zoom.min}
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
