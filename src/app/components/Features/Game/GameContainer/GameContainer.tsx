"use client";
import React, { useState, useRef } from "react";
import GameLocationImage from "@components/Features/Game/GameLocationImage";
import MapType from "@typings/MapType";
import LocationData from "@typings/LocationData";
import dynamic from "next/dynamic";
const GameMap = dynamic(() => import("@components/Features/Game/GameMap"), {
  loading: () => <p>Map is loading...</p>,
  ssr: false,
});

const GameContainer: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const [guessed, setGuessed] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const removeGuessMapInfo = useRef<(() => void) | null>(null);

  const parentContainerRef = useRef(null);

  const createOrUpdateRemoveGuessMapInfo = (newRemoveGuessMapInfo: () => void) => {
    removeGuessMapInfo.current = newRemoveGuessMapInfo;
  };

  const [locationId, setLocationid] = useState(1);

  return (
    <div
      ref={parentContainerRef}
      className="flex-grow relative"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <button className='absolute z-10' style={{bottom: '30px'}}>Next</button> */}
      <GameMap
        region={MapType.SFUBurnaby}
        className="w-full h-full z-0"
        minimized={minimized}
        setMinimized={setMinimized}
        onGuess={() => {
          setGuessed(true);
        }}
        guessed={guessed}
        // canGuess={() => {
        //     // Can only guess if location data has been loaded and have not guessed yet.
        //     return (locationData ?? false) && !guessed;
        // }}
        locationData={locationData}
        createOrUpdateRemoveGuessMapInfo={createOrUpdateRemoveGuessMapInfo}
      />
      {guessed ? (
        <button
          className="absolute z-10 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          style={{ bottom: "30px" }}
          onClick={() => {
            setGuessed(false);
            removeGuessMapInfo.current?.();
            setMinimized(false);
            setLocationid((currentLocationId) => currentLocationId + 1);
          }}
        >
          Next
        </button>
      ) : (
        <GameLocationImage
          region={MapType.SFUBurnaby}
          id={locationId}
          minimized={minimized}
          setMinimized={setMinimized}
          containerRef={parentContainerRef}
          locationData={locationData}
          setLocationData={setLocationData}
        />
      )}
    </div>
  );
};

export default GameContainer;
