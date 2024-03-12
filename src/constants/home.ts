const WIDTHS: Record<number, string> = {
    1: "123px",
    2: "133px",
    3: "114px",
}
const SMALL_WIDTHS: Record<number, string> = {
    1: "109px",
    2: "117px",
    3: "101px",
}

const FILTER_TYPES = {
    EXPLORE_DREPS: 3,
    LATEST_ANSWERS: 1,
    LATEST_QUESTIONS: 2,
};

const FILTERS = [
    { label: "Latest answers", type: FILTER_TYPES.LATEST_ANSWERS },
    { label: "Latest questions", type: FILTER_TYPES.LATEST_QUESTIONS },
    { label: "Explore Dreps", type: FILTER_TYPES.EXPLORE_DREPS },
];

export {
    FILTER_TYPES,
    FILTERS,
    SMALL_WIDTHS, 
    WIDTHS,
}