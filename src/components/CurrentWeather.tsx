import { useEffect, useState } from "react";
import { ICurrentWeather } from "../models/weather-model";
import { environment } from "../env";
import { format } from "date-fns";

interface Props {
  currentWeather: ICurrentWeather[];
  locationKey: string | undefined;
}

const CurrentWeather = (props: Props) => {
  const currentWeather = props.currentWeather[0];
  const locationKey = props.locationKey;
  const [hourlyWeather, setHourlyWeather] = useState<ICurrentWeather[]>();
  const apiUrl = environment.apiUrl;

  useEffect(() => {
    fetch(
      `${apiUrl}/currentconditions/v1/${locationKey}/historical?` +
        new URLSearchParams({
          details: "false",
          apikey: environment.apiKey,
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error("Unexpected error fetching data");
      })
      .then((data) => {
        setHourlyWeather(data);
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }, [props.locationKey]);

  function formatDate(timeDate: string) {
    const newDate = new Date(timeDate);
    return format(newDate, "HH:mm");
  }
  return (
    <div className="card">
      <div className="weather-details">
        <div className="current-weather">
          <img
            width="150"
            src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
              currentWeather.WeatherIcon < 10 ? "0" : ""
            }${currentWeather.WeatherIcon}-s.png`}
            alt="weather icon"
          ></img>
          <div>
            <h1>{Math.floor(currentWeather.Temperature.Metric.Value)}°</h1>
            <p>
              <strong>{currentWeather.WeatherText}</strong>
            </p>
            <p>
              <strong>
                {
                  currentWeather.TemperatureSummary.Past24HourRange.Maximum
                    .Metric.Value
                }
                ° /
                {
                  currentWeather.TemperatureSummary.Past24HourRange.Minimum
                    .Metric.Value
                }
                ° Feels like {currentWeather.RealFeelTemperature.Metric.Value}°
              </strong>
            </p>
          </div>
        </div>
        <div className="extra-info">
          <div className="extra-info-card">
            <p>Humidity</p>
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-humidity-forecast-hydration-precipitation-temperature-weather-38924.png?f=webp&w=512"
              width="50px"
              alt="humidity icon"
            ></img>
            <p>
              <strong>{currentWeather.RelativeHumidity}%</strong>
            </p>
          </div>
          <div className="extra-info-card">
            <p>UV index</p>
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-sun-bright-rays-sunny-weather-33960.png?f=webp&w=512"
              width="50px"
              alt="humidity icon"
            ></img>

            <p>
              <strong>{currentWeather.UVIndexText}</strong>
            </p>
          </div>
          <div className="extra-info-card">
            <p>Wind</p>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/wind-244-532276.png?f=webp&w=512"
              width="50px"
              alt="humidity icon"
            ></img>

            <p>
              <strong>{currentWeather.Wind.Speed.Metric.Value} km/h</strong>
            </p>
          </div>
          <div className="extra-info-card">
            <p>Pressure</p>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/pressure-1686082-1430412.png?f=webp&w=512"
              width="50px"
              alt="humidity icon"
            ></img>

            <p>
              <strong>{currentWeather.Pressure.Metric.Value}mb</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="past-hrs">
        {hourlyWeather &&
          [...hourlyWeather].splice(0,5).reverse().map((weather, index) => (
            <div className="extra-info-card" key={index}>
              <p>{formatDate(weather.LocalObservationDateTime)}</p>
              <img
                width="80"
                src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
                  weather.WeatherIcon < 10 ? "0" : ""
                }${weather.WeatherIcon}-s.png`}
                alt="weather icon"
              ></img>
              <p>{weather.WeatherText}</p>
              <p>{Math.floor(weather.Temperature.Metric.Value)}°</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
