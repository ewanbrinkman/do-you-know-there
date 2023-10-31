'use client';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import mapConfig from '@config/map.json';
import type MapProps from '@typings/MapProps';
import type MapData from '@typings/MapData';
import type MapType from '@typings/MapType';

const Map: React.FC<MapProps> = (props: MapProps) => {
    const [mapType, setMapType] = useState<MapType>(props.mapType);
    const [mapData, setMapData] = useState<MapData | null>(null);

    useEffect(() => {
        import(`@assets/data/regions/${mapType}/map.json`)
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
                <ClickHandler />
            </MapContainer>
    ): null;
};

export default Map;
