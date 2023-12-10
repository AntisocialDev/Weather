import { Dispatch, SetStateAction, useState } from "react";
import { environment } from "../env";
import { ICurrentWeather } from "../models/weather-model";
import React from "react";
import format from "date-fns/format";
import { ILocation } from "../models/location.model";

interface TopBarProps {
  currentWeather: Dispatch<SetStateAction<ICurrentWeather[] | undefined>>;
  isLoading: Dispatch<SetStateAction<boolean | undefined>>;
  err: Dispatch<SetStateAction<string | undefined>>;
  locationKey:Dispatch<SetStateAction<string | undefined>>;
}

export const TopBar = (props: TopBarProps) => {
  const [locationList, setLocationList] = useState<ILocation[]>();
  const [suggDisplay, setSuggDisplay] = useState<string>();
  const date = new Date();
  const dateNow = format(date, "dd MMMM, yyyy, hh:mm");
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather[]>();
  const apiUrl = environment.apiUrl;
  props.isLoading(false);

  function getLocations(e: any) {
    setSuggDisplay("block");
    setCity(e.target.value);
    fetch(
      `${apiUrl}/locations/v1/cities/autocomplete?` +
        new URLSearchParams({
          apikey: environment.apiKey,
          q: city,
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error("Unexpected error");
      })
      .then((data) => {
        setLocationList(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }

  function getCurrentWeather(event: any, city: ILocation) {
    setSuggDisplay("none");
    setSelectedCity(`${city.LocalizedName}, ${city.Country.LocalizedName}`);
    props.locationKey(city.Key);
    props.isLoading(true);
    event.preventDefault();

    fetch(
      `${apiUrl}/currentconditions/v1/${city.Key}?` +
        new URLSearchParams({
          apikey: environment.apiKey,
          details: "true",
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error("Error fetching data!");
      })
      .then((data: ICurrentWeather[]) => {
        props.err("");
        props.isLoading(false);
        setCurrentWeather(data);
        props.currentWeather(data);
      })
      .catch((e: Error) => {
        props.err(e.message);
      });
  }

  return (
    <div className="topbar">
      <div className="location-details">
        <h2>{selectedCity}</h2>
        <p>{dateNow}</p>
      </div>
      <div>
        <form className="search-div">
          <div>
            <input
              type="search"
              placeholder="Search City"
              value={city}
              onChange={(e) => getLocations(e)}
            ></input>
            <div
              className="suggestion-box"
              style={{
                display: suggDisplay,
              }}
            >
              {locationList &&
                city &&
                locationList?.map((city) => (
                  <p onClick={(e) => getCurrentWeather(e, city)}>
                    {city.LocalizedName}, {city.Country.LocalizedName}
                  </p>
                ))}
            </div>
          </div>
          <select disabled className="lang-select" value={"eng"}>
            <option value={"eng"}>Eng</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default TopBar;
