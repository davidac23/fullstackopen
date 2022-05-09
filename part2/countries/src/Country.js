import { useEffect, useState } from "react";
import axios from "axios";

const RenderCountry = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div> capital {country.capital}</div>
      <div> area {country.area}</div>
      <h2>languages:</h2>
      {Object.values(country.languages).map((language, i) => {
        return <li key={`${language} ${i}`}>{language}</li>;
      })}
      <br />
      <img src={country.flags.png}></img>
      {weather && (
        <>
          <h1>Weather in {country.name.common}</h1>
          <div>temperature {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          ></img>
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </div>
  );
};

const Country = ({ countries }) => {
  const [showCountry, setShowCountry] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    setShowCountry(null);
    if (countries.length === 1) {
      getWeather(countries[0]);
    }
  }, [countries]);

  const getWeather = (country) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const lon = country.latlng[0];
    const lat = country.latlng[1];
    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric `
    );
    promise.then((response) => {
      setWeather(response.data);
    });
  };

  if (countries.length > 10) return "Too many matches";
  if (countries.length === 1) {
    return (
      <>
        <RenderCountry country={countries[0]} weather={weather} />
      </>
    );
  }
  return (
    <>
      {!showCountry ? (
        countries.map((country, i) => {
          return (
            <div key={`${country.name.common} ${i}`}>
              {country.name.common}
              <button
                onClick={() => {
                  setShowCountry(country);
                  getWeather(country);
                }}
              >
                show
              </button>
            </div>
          );
        })
      ) : (
        <RenderCountry country={showCountry} weather={weather} />
      )}
    </>
  );
};

export default Country;
