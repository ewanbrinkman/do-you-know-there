import 'leaflet/dist/leaflet.css';
import React from 'react';
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import icon from '@icons/icon';
import type MapProps from '@typings/map/MapProps';
import type GameMapProps from '@typings/map/GameMapProps';
import Map from '@components/Common/Map';
import './GameMap.css';

const GameMap: React.FC<GameMapProps> = (props: GameMapProps) => {
    const MapClickHandler: React.FC = () => {
        const map = useMapEvents({
            click: (e) => {
                if (!props.locationData || props.guessed || !props.mapData) {
                    return;
                }

                props.onGuess();

                // Display the location guessed by the player.
                const guessMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                    icon,
                }).addTo(map);

                // Display the correct location.
                const correctMarker = L.marker(
                    [
                        props.locationData.coordinates.lat,
                        props.locationData.coordinates.lng,
                    ],
                    { icon },
                ).addTo(map);

                // Create the popup showing the correct location.
                const locationDataPopup = `<img src="/areas/${props.locationData.area}/locations/${props.locationData.filename}" alt="${props.locationData.name}" style="border-radius:10%;">`;
                const correctPopup = L.popup({}).setContent(locationDataPopup);
                correctMarker.bindPopup(correctPopup).openPopup();

                const latlngs = [
                    guessMarker.getLatLng(),
                    correctMarker.getLatLng(),
                ];

                const markerLine = L.polyline(latlngs, {
                    color: '#1d4ed8',
                    dashArray: '5, 10', // number of pixels drawns, number of pixels skipped
                }).addTo(map);

                map.setZoom(props.mapData.zoom.initial);

                // Find the distance between the two guesses locations.
                props.addLocationResult({
                    distance: correctMarker
                        .getLatLng()
                        .distanceTo(guessMarker.getLatLng()),
                });

                props.createOrUpdateRemoveGuessMapInfo(() => {
                    guessMarker.remove();
                    correctMarker.remove();
                    markerLine.remove();
                });
            },
        });

        return null;
    };

    const mapProps: MapProps = {
        mapData: props.mapData,
        className: props.className,
        clickHandler: MapClickHandler,
        zoomControl: true,
    };

    return (
        <div
            className={`absolute w-full h-full ${
                props.minimized
                    ? 'game-map__overlay--minimized'
                    : 'game-map__overlay--not-minimized'
            }`}
            onClick={() => {
                props.setMinimized(true);
            }}
        >
            <Map {...mapProps} />
        </div>
    );
};

export default GameMap;
