'use client';
import React, { useEffect, useState } from "react";
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
    const container = document.querySelector('.game-location-image');

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
    <div className={`absolute z-10 h-1/2 aspect-square game-location-image ${
        props.minimized
          ? "game-location-image--minimized"
          : "game-location-image--not-minimized"
      }`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LocationImage
        region={props.region}
        id={props.id}
        size={400}
        priority={true}
        onClick={toggleMinimized}
        style={{
            width: `${Math.min(containerSize.width, containerSize.height)}px`,
            height: `${Math.min(containerSize.width, containerSize.height)}px`,
            overflow: 'hidden',
        }}
        // style={{
        //     width: '100%',
        //     paddingTop: '100%',
        //     // backgroundColor:     '#3498db',
        // }}
        // className={`absolute z-10 w-1/2 h-1/2 aspect-square game-location-image ${
        //     props.minimized
        //       ? "game-location-image--minimized"
        //       : "game-location-image--not-minimized"
        //   }`}

        //   className={`absolute z-10 spect-square game-location-image ${
        
        //   style={{maxWidth: '50%', maxHeight: '50%'}}
        //   style={{'maxWidth': '50%', 'maxHeight': '50%', 'aspectRatio': '1/1'}}
      />
    </div>
  );
};

export default GameLocationImage;
