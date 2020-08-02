import React from "react";
import "./Preferences.scss";
import Slider from "@material-ui/core/Slider";

function Preferences({
  userRain,
  setUserRain,
  userTemperature,
  setUserTemperature,
  userHumidity,
  setUserHumidity,
  userWind,
  setUserWind,
  zip,
  handleZipChange,
  city,
}) {
  const handleSliderChange = (event, newValue, setter) => {
    setter(newValue);
  };
  return (
    <div className="preferences card">
      <h3 className="header">Preferences</h3>
      <div className="zipcode">
        <div className="label">Enter your ZIP code:</div>
        <div className="sub-label">(US-only, for now)</div>
        <input
          type="text"
          value={zip}
          onChange={(e) => handleZipChange(e)}
          autoComplete="section-blue shipping postal-code"
        ></input>
        <div className="zip-city">{city.name}</div>
      </div>
      <div className="preferences-slider">
        <div className="label">Temperature (F)</div>
        <Slider
          value={userTemperature}
          valueLabelDisplay="on"
          onChange={(e, v) => handleSliderChange(e, v, setUserTemperature)}
          aria-labelledby="range-slider"
        />
      </div>
      <div className="preferences-slider">
        <div className="label">Humidity (%)</div>

        <Slider
          value={userHumidity}
          valueLabelDisplay="on"
          onChange={(e, v) => handleSliderChange(e, v, setUserHumidity)}
          aria-labelledby="range-slider"
        />
      </div>
      <div className="preferences-slider">
        <div className="label">Wind (MPH)</div>

        <Slider
          value={userWind}
          valueLabelDisplay="on"
          onChange={(e, v) => handleSliderChange(e, v, setUserWind)}
          aria-labelledby="range-slider"
        />
      </div>
      <div className="preferences-slider">
        <div className="label">Rain (% Chance)</div>

        <Slider
          value={userRain}
          valueLabelDisplay="on"
          onChange={(e, v) => handleSliderChange(e, v, setUserRain)}
          aria-labelledby="range-slider"
        />
      </div>
      {/* TODO: Add light/dark based on sunrise/set */}
    </div>
  );
}

export default Preferences;
