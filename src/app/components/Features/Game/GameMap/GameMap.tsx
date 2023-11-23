'use client';
import React, { useRef } from 'react';
import { useMapEvents, Marker, Polyline, Popup } from 'react-leaflet';
import icon from '@icons/icon';
import type MapProps from '@typings/map/MapProps';
import type GameMapProps from '@typings/map/GameMapProps';
import Map from '@components/Common/Map';
import LocationImage from '@components/Common/LocationImage';
import themeConfig from '@config/theme.json';

const GameMap: React.FC<GameMapProps> = (props: GameMapProps) => {
    const correctMarkerRef = useRef<L.Marker | null>(null);

    const MapClickHandler: React.FC = () => {
        useMapEvents({
            click: (e) => {
                if (!props.locationData || props.guessed || !props.mapData) {
                    return;
                }

                props.onPlaceMarker();

                props.setGuessMarkerCoordinates([e.latlng.lat, e.latlng.lng]);
            },
        });

        return null;
    };

    const mapProps: MapProps = {
        mapRef: props.mapRef,
        mapData: props.mapData,
        className: props.className,
        clickHandler: MapClickHandler,
        zoomControl: true,
    };

    return (
        <div
            className={`absolute flex justify-center w-full h-full before:z-[1] before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:transition-all before:duration-300 before:ease-in-out ${
                props.minimized
                    ? 'before:pointer-events-none'
                    : 'before:opacity-70 before:bg-black'
            }`}
            onClick={() => {
                props.setMinimized(true);
            }}
        >
            <Map {...mapProps}>
                {props.guessMarkerCoordinates && (
                    // Guess marker.
                    <Marker
                        position={props.guessMarkerCoordinates}
                        icon={icon}
                    />
                )}
                {props.guessed && props.locationData && (
                    // Correct marker.
                    <Marker
                        ref={correctMarkerRef}
                        position={[
                            props.locationData.coordinates.lat,
                            props.locationData.coordinates.lng,
                        ]}
                        icon={icon}
                        eventHandlers={{
                            add: () => {
                                correctMarkerRef.current &&
                                    correctMarkerRef.current.openPopup();
                            },
                        }}
                    >
                        <Popup minWidth={100}>
                            <LocationImage
                                locationData={props.locationData}
                                className="rounded-md"
                            />
                        </Popup>
                    </Marker>
                )}
                {props.guessed &&
                    props.locationData &&
                    props.guessMarkerCoordinates && (
                        <Polyline
                            positions={[
                                props.guessMarkerCoordinates,
                                [
                                    props.locationData.coordinates.lat,
                                    props.locationData.coordinates.lng,
                                ],
                            ]}
                            color={themeConfig.color.map.line}
                            dashArray={[5, 10]} // number of pixels drawns, number of pixels skipped
                        />
                    )}
            </Map>
            {props.children}
        </div>
    );
};

export default GameMap;
