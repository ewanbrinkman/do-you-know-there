"use client";
import "leaflet/dist/leaflet.css";
import React from "react";
// import ReactDom from 'react-dom';
import L from "leaflet";
import { useMapEvents } from "react-leaflet";
import icon from "@icons/icon";
import type MapProps from "@typings/MapProps";
import type GameMapProps from "@typings/GameMapProps";
import Map from "@components/Common/Map";
import "./GameMap.css";
import LocationImage from '@components/Common/LocationImage';

const GameMap: React.FC<GameMapProps> = (props: GameMapProps) => {
  const MapClickHandler: React.FC = () => {
    const map = useMapEvents({
      click: (e) => {
        if (!props.locationData || props.guessed) {
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
          { icon }
        ).addTo(map);
        
        // Create the popup showing the correct location.
        // const popupContainer = document.createElement('div');
        // ReactDOM.render(<LocationImage region={props.region} id={props.locationData.id}/>, popupContainer);

        const correctPopup = L.popup({}).setContent(
          `<img src="/regions/${props.region}/locations/${props.locationData.filename}" alt="${props.locationData.name}" width="200" height="200">`
        );
        correctMarker.bindPopup(correctPopup).openPopup();

        const latlngs = [guessMarker.getLatLng(), correctMarker.getLatLng()];

        const markerLine = L.polyline(latlngs, {
          color: "blue",
          dashArray: "5, 10", // number of pixels drawns, number of pixels skipped
        }).addTo(map);

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
    region: props.region,
    className: props.className,
    clickHandler: MapClickHandler,
  };

  return (
    <div
      className={`absolute w-full h-full ${
        props.minimized
          ? "game-map__overlay--minimized"
          : "game-map__overlay--not-minimized"
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
