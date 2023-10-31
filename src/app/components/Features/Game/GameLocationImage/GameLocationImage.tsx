import React from "react";
import GameLocationImageProps from "@typings/GameLocationImageProps";
import LocationImage from "@components/Common/LocationImage";
import "./GameLocationImage.css";

const GameLocationImage: React.FC<GameLocationImageProps> = (
  props: GameLocationImageProps
) => {
  const toggleMinimized = (event: React.MouseEvent<HTMLElement>) => {
    props.setMinimized(!props.minimized);
  };

  return (
    <LocationImage region={props.region} id={props.id} size={400} priority={true} onClick={toggleMinimized} className={`absolute z-10 w-1/2 h-1/2 game-location-image ${
        props.minimized
          ? "game-location-image--minimized"
          : "game-location-image--not-minimized"
      }`}/>
  );
};

export default GameLocationImage;
