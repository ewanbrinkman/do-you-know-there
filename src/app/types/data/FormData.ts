interface FormData {
    area: string;
    name: string;
    difficulty: number;
    hint: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    keywords: string[];
}

export default FormData;
