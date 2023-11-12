import LocationResult from '@typings/game/LocationResult';

interface GameContainerProps {
    setGameOver: (value: boolean) => void;
    addLocationResult: (value: LocationResult) => void;
    getLatestLocationResult: () => LocationResult;
}

export default GameContainerProps;
