'use client';
import React, { useEffect, useState, useRef } from "react";
import GameLocationImageProps from "@typings/GameLocationImageProps";
import LocationImage from "@components/Common/LocationImage";
import "./GameLocationImage.css";

const GameLocationImage: React.FC<GameLocationImageProps> = (
  props: GameLocationImageProps
) => {
  const toggleMinimized = (event: React.MouseEvent<HTMLElement>) => {
    props.setMinimized(!props.minimized);
  };

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = props.containerRef.current;

    const updateContainerSize = () => {
        if (container) {
            const { width, height } = container.getBoundingClientRect();
            setContainerSize({ width, height });
        }
    };

    updateContainerSize();

    window.addEventListener('resize', updateContainerSize);

    return () => {
        window.removeEventListener('resize', updateContainerSize);
    };

  }, []);

  return (
      <LocationImage
        region={props.region}
        id={props.id}
        size={400}
        priority={true}
        onClick={toggleMinimized}
        className={`absolute z-10 game-location-image ${
          props.minimized
            ? "game-location-image--minimized"
            : "game-location-image--not-minimized"
        }`}
        style={{
            width: `${Math.min(containerSize.width, containerSize.height) * 0.75}px`,
            height: `${Math.min(containerSize.width, containerSize.height) * 0.75}px`,
        }}
      />
  );
};

export default GameLocationImage;
