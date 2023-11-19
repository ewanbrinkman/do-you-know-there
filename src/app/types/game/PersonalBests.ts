interface PersonalBests {
    summary: {
        total: number;
        closest: number;
        furthest: number;
    };
    locations: {
        [id: string]: number;
    };
}

export default PersonalBests;
