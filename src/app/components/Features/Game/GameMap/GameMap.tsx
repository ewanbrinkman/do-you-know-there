"use client";
import "leaflet/dist/leaflet.css";
import React from "react";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";
import icon from "@icons/icon";
import type MapProps from "@typings/MapProps";
import type GameMapProps from "@typings/GameMapProps";
import Map from "@components/Common/Map";
import './GameMap.css';

const MapClickHandler: React.FC = () => {
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
