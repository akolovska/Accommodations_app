export const RentalCategory = {
    HOUSE: "HOUSE",
    APARTMENT: "APARTMENT",
    HOTEL: "HOTEL",
    ROOM: "ROOM",
} as const;

export type RentalCategory =
    typeof RentalCategory[keyof typeof RentalCategory];