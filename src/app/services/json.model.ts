export namespace RawJson {

    export interface TripAdvisor {
        icon: string;
        totalRatings: number;
        score: number;
    }

    export interface Category {
        score: number;
    }

    export interface Ratings {
        tripAdvisor: TripAdvisor;
        category: Category;
    }

    export interface Parking {
        AirportParkingIncluded: boolean;
    }

    export interface Coordinates {
        latitude: number;
        longitude: number;
    }

    export interface Location {
        coordinates: Coordinates;
    }

    export interface Image {
        small: string;
        medium: string;
        large: string;
    }

    export interface Item {
        code: string;
        name: string;
        shortDescription?: any;
        longDescription: string;
    }

    export interface RoomGroup {
        type: string;
        name: string;
        description: string;
        items: Item[];
    }

    export interface Board {
        code: string;
        name: string;
        description: string;
    }

    export interface Location2 {
        title: string;
        description: string[];
    }

    export interface FoodBeverage {
        title: string;
        description: string[];
    }

    export interface Sports {
        title: string;
        description: string[];
    }

    export interface Pool {
        title: string;
        description: string[];
    }

    export interface Children {
        title: string;
        description: string[];
    }

    export interface AdditionalInfo {
        title: string;
        description: string[];
    }

    export interface IncludedInPackage {
        title: string;
        description: string[];
    }

    export interface Descriptions {
        highlights: string[];
        location: Location2;
        foodBeverage: FoodBeverage;
        sports: Sports;
        pool: Pool;
        children: Children;
        additionalInfo: AdditionalInfo;
        includedInPackage: IncludedInPackage;
    }

    export interface Catalog {
        id: string;
        name: string;
        start: Date;
        end: Date;
        lastUpdate: Date;
        catalogPage: string;
        pricePage: number;
    }

    export interface Accommodation {
        roomGroups: RoomGroup[];
        boards: Board[];
        descriptions: Descriptions;
        concepts: any[];
        catalog: Catalog;
        hotelName: string;
        cityName: string;
        destinationName: string;
        countryCode: string;
        countryName: string;
        giataCityId: string;
        giataDestinationId: string;
        giataCatalogHotelId: string;
    }

    export interface ClimateEntry {
        sunHours: string;
        waterTemperature: string;
        dayTemperature: string;
        nightTemperature: string;
        rainDays: string;
    }

    export interface ClimatePerMonth {
        climateEntry: ClimateEntry[];
    }

    export interface Weather {
        climatePerMonth: ClimatePerMonth;
    }

    export interface Hotel {
        productCode: string;
        season: string;
        brochures: string[];
        giataId: string;
        rnet?: any;
        ratings: Ratings;
        parking: Parking;
        location: Location;
        images: Image[];
        accommodation: Accommodation;
        weather: Weather;
        tourOperator: string;
    }

    export interface RootObject {
        hotel: Hotel;
    }

}

