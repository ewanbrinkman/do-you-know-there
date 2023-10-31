'use client';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import icon from '@icons/icon';
import type MapProps from '@typings/MapProps';
import type GameMapProps from '@typings/GameMapProps';
import Map from '@components/Common/Map';

const ClickHandler: React.FC = () => {
    const map = useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            console.log(lat, lng);
            L.marker([lat, lng], { icon }).addTo(map);
        },
    });

    return null;
};

const GameMap: React.FC<GameMapProps> = (props: GameMapProps) => {
    const mapProps: MapProps = {
        mapType: props.mapType,
        className: props.className,
        minimized: props.minimized,
        setMinimized: props.setMinimized,
        clickHandler: ClickHandler
    }

    return (
        <div className='w-full h-full'>
            <Map {...mapProps}/>
        </div>
    )
};

export default GameMap;
