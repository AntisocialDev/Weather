import { useEffect, useState } from "react";
import { ICurrentWeather } from "../models/weather-model";
import { environment } from "../env";
import { format } from "date-fns";
import { IForecast } from "../models/forecast-model";

interface Props {
  locationKey: string | undefined;
}

const Forecast = (props: Props) => {
  const apiUrl = environment.apiUrl;
  const [forecastData, setForecastData] = useState<IForecast>();

  function convertDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {weekday: 'long'})
  }

  useEffect(() => {
    fetch(
      `${apiUrl}/forecasts/v1/daily/5day/${props.locationKey}?` +
        new URLSearchParams({
          apikey: environment.apiKey,
          details: "false",
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error("An error Occured");
      })
      .then((data) => {
        setForecastData(data);
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }, [props.locationKey]);

  return (
    <div className="card">
      <h2>Forecast</h2>
      <div>
        {forecastData?.DailyForecasts.map((forecast, index) => (
          <div className="forecast-body" key={index}>
            <p>{convertDate(forecast.Date)}</p>

            <img
              width="80"
              src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
                forecast.Day.Icon < 10 ? "0" : ""
              }${forecast.Day.Icon}-s.png`}
              alt="weather icon"
            ></img>
            <img
              width="80"
              src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
                forecast.Night.Icon < 10 ? "0" : ""
              }${forecast.Night.Icon}-s.png`}
              alt="weather icon"
            ></img>
            <p>{forecast.Temperature.Maximum.Value}°</p>
            <p>{forecast.Temperature.Minimum.Value}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
