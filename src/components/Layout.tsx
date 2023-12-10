import {  useState } from "react";
import { ICurrentWeather } from "../models/weather-model";
import CurrentWeather from "./CurrentWeather";
// import Forecast from "./Forecast";
import MoreWeather from "./MoreWeather";
import Overview from "./Overview";
import TopBar from "./TopBar";
import Forecast from "./Forecast";

const Layout = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather[]>();
  const [err, setErr] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
    const [locationKey, setLocationKey] = useState<string | undefined>();


  return (
    <div className="app">
      <p>{isLoading}</p>
      <TopBar
        err={setErr}
        isLoading={setIsLoading}
        currentWeather={setCurrentWeather}
        locationKey={setLocationKey}
      ></TopBar>
      {err && (
        <div className="loading">
          <p>{err}</p>
        </div>
      )}
      {isLoading && (
        <div className="loading">
          <p>Loading......</p>
        </div>
      )}
      {!currentWeather && !isLoading && !err && (
        <div className="loading">
          <p>Enter a city in the searchbar</p>
        </div>
      )}
      
      {!isLoading && currentWeather && (
        <div className="weather-info">
          <CurrentWeather locationKey={locationKey} currentWeather={currentWeather}></CurrentWeather>
          {/* <CurrentWeather  currentWeather={currentWeather}></CurrentWeather> */}
          {/* <Overview></Overview> */}
          <Forecast locationKey={locationKey}></Forecast>
          <div className="overview-div">
            {/* <Overview></Overview>
            <MoreWeather></MoreWeather> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
