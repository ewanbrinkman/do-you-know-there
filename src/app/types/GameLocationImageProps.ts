import BaseLocationImageProps from "@typings/BaseLocationImageProps";

interface GameLocationImageProps extends BaseLocationImageProps {
    region: string;
    minimized: boolean;
    setMinimized: (value: boolean) => void;
}

export default GameLocationImageProps;
