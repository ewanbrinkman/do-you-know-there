import LocationResult from '@typings/game/LocationResult';

interface ResultsContainerProps {
    locationResults: LocationResult[];
    onPlayAgain: () => void;
}

export default ResultsContainerProps;
