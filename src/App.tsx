import React, { useState, useEffect } from "react";
import "./App.css";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import FlightResults from "./Components/FlightResults";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import ProfileInfo from "./Components/ProfileInfo";
import Reach from "./Components/Reach/Reach";
import SearchForm from "./Components/SearchForm";
import SearchParametersDisplay from "./Components/searchParametersDisplay";
import DevAirports from "./Util/Airports.json";
import DevAirportFlightData from "./Util/AirportFlightData.json";
import { Airport, Arrival, Departures } from "./Types/Flights";
import { MainContext, SearchContext } from "./Types/Contexts";

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [devMode, setDevMode] = useState(true);
  const [searchAirports, setSearchAirports] = useState<Airport[]>([]);
  const [searchType, setSearchType] = useState("from");
  const [outGoingFlights, setAirportDepartures] = useState<Departures[]>(
    DevAirportFlightData.departures
  );
  const [incomingFlights, setAirportArrivals] = useState<Arrival[]>(
    DevAirportFlightData.arrivals
  );

  useEffect(() => {
    setIsLoading(true);
    if (devMode) {
      setAirports(DevAirports.rows);
      setIsLoading(false);
    } else {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
          "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
        },
      };

      fetch("https://flight-radar1.p.rapidapi.com/airports/list", options)
        .then((response) => response.json())
        .then((response) => {
          setAirports(response.rows);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          console.log("Failed to fetch launching dev mode");
          setDevMode(true);
        });
    }
  }, [[], devMode]);

  useEffect(() => {
    if (searchType === "from") {
      setSearchAirports(airports);
    } else {
      console.log(
        outGoingFlights.filter((flight) =>
          airports
            .map((airport) => airport.icao)
            .includes(flight.arrival.airport.icao)
        )
      );
    }
  }, [searchType]);

  /**
   * A function to randomly decide a default airport.
   * @Returns A random airport.
   */
  function getRandomAirport() {
    const min = 0;
    const max = airports.length;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const randomAirport = airports[randomNumber];
    return randomAirport;
  }

  useEffect(() => {
    setFromAirport(getRandomAirport());
    setToAirport(getRandomAirport());
  }, [airports.length]);

  return (
    <div className="App w-full">
      {overlay && <Overlay setOverlay={setOverlay} />}
      {isLoading && (
        <>
          <Overlay setOverlay={setOverlay} />
          <Reach />
        </>
      )}
      <BackGround menuWide={menuWide} />
      <div className="flex relative">
        <Menu menuWide={menuWide} setMenuWide={setMenuWide} />
        <div
          className={`h-min absolute ${
            menuWide
              ? "top-1/4 left-1/4 w-2/3"
              : "top-[34px] left-[12%] w-[87%]"
          } transition-all`}
        >
          <div className="flex justify-between">
            <Options
              activeChoice={activeChoice}
              setActiveChoice={setActiveChoice}
              menuWide={menuWide}
            />
            {menuWide && (
              <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
            )}
          </div>
          {menuWide ? (
            <MainContext.Provider
              value={{
                isLoading,
                airports,
              }}
            >
              {activeChoice === "flights" ? (
                <SearchForm
                  setOverlay={setOverlay}
                  setMenuWide={setMenuWide}
                  menuWide={menuWide}
                  toAirport={toAirport}
                  setToAirport={setToAirport}
                  fromAirport={fromAirport}
                  setFromAirport={setFromAirport}
                  typeOfTrip={typeOfTrip}
                  setTypeOfTrip={setTypeOfTrip}
                  setDepartureDate={setDepartureDate}
                  setReturnDate={setReturnDate}
                  searchAirports={searchAirports}
                  setSearchType={setSearchType}
                  searchType={searchType}
                />
              ) : null}
            </MainContext.Provider>
          ) : (
            <SearchContext.Provider
              value={{
                typeOfTrip,
                fromAirport,
                departureDate,
                returnDate,
                toAirport,
                devMode,
                outGoingFlights,
              }}
            >
              <SearchParametersDisplay />
              <FlightResults />
            </SearchContext.Provider>
          )}
        </div>
      </div>
      <div className="flex absolute right-14 top-[34px]">
        <BecomeAPartner />
        <ProfileInfo
          profilePicture={Assets.ProfilePicture}
          userName="Mansurul Haque"
        />
      </div>
    </div>
  );
}

export default App;
