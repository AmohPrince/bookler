import { SetStateAction } from "react";
import { Airline, Airport, Country, Departures, TravelerInfo } from "./Flights";
import { TravellerHotelInfo } from "./Hotel";

export interface FlightSearchParametersContext {
  toAirport: Airport | null;
  returnDate: Date | null;
  departureDate: Date | null;
  typeOfTrip: string;
  fromAirport: Airport | null;
  outGoingFlights: Departures[];
  setTypeOfTrip: React.Dispatch<SetStateAction<string>>;
  setDepartureDate: React.Dispatch<SetStateAction<Date | null>>;
  setReturnDate: React.Dispatch<SetStateAction<Date | null>>;
  setFromAirport: React.Dispatch<React.SetStateAction<Airport | null>>;
  setToAirport: React.Dispatch<React.SetStateAction<Airport | null>>;
}

export interface MainContextValue {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAirports: React.Dispatch<React.SetStateAction<Airport[]>>;
  setAirlines: React.Dispatch<React.SetStateAction<Airline[]>>;
  setDevMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
  setCountryList: React.Dispatch<React.SetStateAction<Country[]>>;
  isLoading: boolean;
  airports: Airport[];
  airlines: Airline[];
  devMode: boolean;
  countryList: Country[];
  menuWide: boolean;
}

export interface BookingContextType {
  initiateBooking: (flight: Departures) => void;
  travelersInfo: TravelerInfo | null;
  flightPrice: FlightPrices | null;
  booking: boolean;
  setTravelersInfo: React.Dispatch<React.SetStateAction<TravelerInfo | null>>;
}

export type FlightPrices = {
  baseFare: number;
  flightSurCharges: number;
};

export interface HotelSearch {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | null>>;
  targetHotelLocation: Airport | null;
  setTargetHotelLocation: React.Dispatch<React.SetStateAction<Airport | null>>;
  travellerHotelInfo: TravellerHotelInfo;
  setTravellerHotelInfo: React.Dispatch<
    React.SetStateAction<TravellerHotelInfo>
  >;
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
}

export interface CarRentalSearch {
  pickUpDate: Date | null;
  setPickUpDate: React.Dispatch<React.SetStateAction<Date | null>>;
  dropOffDate: Date | null;
  setDropOffDate: React.Dispatch<React.SetStateAction<Date | null>>;
  pickUpTime: string | null;
  setPickUpTime: React.Dispatch<React.SetStateAction<string | null>>;
  dropOffTime: string | null;
  setDropOffTime: React.Dispatch<React.SetStateAction<string | null>>;
  dropCarAtDifferentLocation: boolean;
  setDropCarAtDifferentLocation: React.Dispatch<React.SetStateAction<boolean>>;
  pickUpLocation: Airport | null;
  dropOffLocation: Airport | null;
  setPickUpLocation: React.Dispatch<React.SetStateAction<Airport | null>>;
  setDropOffLocation: React.Dispatch<React.SetStateAction<Airport | null>>;
}

export interface Authenticator {
  email: string | null;
  picture: string | null;
  name: string | null;
  accountType: string | null;
  birthday: string | null;
  gender: string | null;
  address: string | null;
  aud?: string;
  azp?: string;
  email_verified?: boolean;
  exp?: number;
  family_name?: string;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  nbf?: string;
  sub?: string;
  mobileNumber?: string | null;
  password?: string | null;
}
