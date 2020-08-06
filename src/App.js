import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/header/Header";
import Preferences from "./components/preferences/Preferences";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [userRain, setUserRain] = useState([0, 20]);
  const [userTemperature, setUserTemperature] = useState([60, 85]);
  const [userHumidity, setUserHumidity] = useState([0, 80]);
  const [userWind, setUserWind] = useState([0, 18]);
  const [zip, setZip] = useState("");
  const [forecast, setForecast] = useState({});

  const WEATHER_ENDPOINT =
    "https://us-central1-ideal-weather.cloudfunctions.net/getForecast";

  function handleZipChange(e) {
    // remove whitespace, limit to 5 digits
    let value = e.target.value.toString().trim();
    value = value.substr(0, 5);
    if (value === zip) {
      return;
    }
    let findNonDigit = /[^\d]/;
    if (findNonDigit.exec(value) === null) {
      setZip(value);
      if (isValidZip(value)) {
        updateForecast(value);
      }
    }
  }

  function isValidZip(value) {
    return value.length === 5;
  }

  /**
   * Queries OpenWeather API and updates forecast state with response
   * @param {string} zip
   */
  async function updateForecast(zip) {
    const res = await axios.get(WEATHER_ENDPOINT, { params: { zip: zip } });
    setForecast(res.data);
  }

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Preferences
          userRain={userRain}
          setUserRain={setUserRain}
          userTemperature={userTemperature}
          setUserTemperature={setUserTemperature}
          userHumidity={userHumidity}
          setUserHumidity={setUserHumidity}
          userWind={userWind}
          setUserWind={setUserWind}
          zip={zip}
          handleZipChange={handleZipChange}
          city={forecast.city || ""}
        />
        {zip.length === 5 && (
          <Forecast
            forecastList={forecast.list}
            preferences={{ userTemperature, userHumidity, userWind, userRain }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
