import 'leaflet/dist/leaflet.css';
import React from 'react';
// import ReactDOMServer from "react-dom/server";
// import { renderToPipeableStream } from 'react-dom/server';
// import { Writable } from 'stream';
// import { renderToStaticMarkup } from "react-dom/server";
// import ReactDOM from "react-dom";
// import { createPortal } from "react-dom";
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import icon from '@icons/icon';
import type MapProps from '@typings/map/MapProps';
import type GameMapProps from '@typings/map/GameMapProps';
import Map from '@components/Common/Map';
import './GameMap.css';
// import LocationImage from '@components/Common/LocationImage';

// const getData = async (component: any) => {
//   const ReactDOMServer = (await import('react-dom/server')).default;
//   const staticMarkup = renderToStaticMarkup(component);
//   // const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
//   return staticMarkup;
// };

// function renderToStaticMarkup(element: any): any {
//   return new Promise((resolve, reject) => {
//     let html = '';
//     const writableStream = new Writable({
//       write(chunk: any, encoding: any, callback: any) {
//         html += chunk;
//         callback();
//       },
//     });

//     writableStream.on('finish', () => {
//       resolve(html);
//     });

//     writableStream.on('error', reject);

//     renderToPipeableStream(element).pipe(writableStream);
//   });
// }

const GameMap: React.FC<GameMapProps> = (props: GameMapProps) => {
    const MapClickHandler: React.FC = () => {
        const map = useMapEvents({
            click: async (e) => {
                // click: (e) => {
                if (!props.locationData || props.guessed || !props.mapData) {
                    // Location data hasn't been set yet.
                    return;
                }

                console.log([e.latlng.lat, e.latlng.lng]);

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

                // const popupContainer = document.createElement('div');

                // ReactDOM.render(<LocationImage locationData={props.locationData} size='100px'/>, popupContainer);
                // createPortal(<LocationImage locationData={props.locationData} size='100px'/>, popupContainer);(<LocationImage locationData={props.locationData} size='100px'/>, popupContainer);

                // const locationDataPopup = ReactDOMServer.renderToString(<LocationImage locationData={props.locationData} size='100px'/>);
                // const locationDataPopup = await renderToStaticMarkup(<LocationImage locationData={props.locationData} size='100px'/>);

                // const locationDataPopup = await getData(<LocationImage locationData={props.locationData} size='100px'/>);

                const locationDataPopup = `<img src="/areas/${props.locationData.area}/locations/${props.locationData.filename}" alt="${props.locationData.name}" width="200px" height="200px">`;

                const correctPopup = L.popup({}).setContent(locationDataPopup);
                // const correctPopup = L.popup({}).setContent(popupContainer);
                // const correctPopup = L.popup({}).setContent(
                //     `<img src="/areas/${props.locationData.area}/locations/${props.locationData.filename}" alt="${props.locationData.name}" width="200" height="200">`,
                // );
                correctMarker.bindPopup(correctPopup).openPopup();

                const latlngs = [
                    guessMarker.getLatLng(),
                    correctMarker.getLatLng(),
                ];

                const markerLine = L.polyline(latlngs, {
                    color: 'blue',
                    dashArray: '5, 10', // number of pixels drawns, number of pixels skipped
                }).addTo(map);

                map.setZoom(props.mapData.zoom.initial);

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
