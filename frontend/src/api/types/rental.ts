import {RentalCategory} from "./rentalCategory.ts";
import type {Host} from "./host.ts";

export interface Rental {
    id: number,
    name: string;
    category: RentalCategory;
    host: Host;
    numRooms: number;
}

export interface RentalRequest {
    name: string;
    category: RentalCategory;
    host: Host;
    numRooms: number;
}

export interface RentalResponse {
    id: number,
    name: string;
    category: RentalCategory;
    host: Host;
    numRooms: number;
}

export interface RentalProjection {
    id: number,
    name: string;
    category: RentalCategory;
    host: Host;
    numRooms: number;
}