import React from "react";
import "./Preferences.scss";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import PreferenceSlider from "../preferenceSlider/PreferenceSlider";

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
      <div className="controls">
        <div className="zipcode">
          <div className="label">Enter your ZIP code:</div>
          <div className="sub-label">(US-only, for now)</div>
          <TextField
            id="outlined-basic"
            autoComplete="section-blue shipping postal-code"
            value={zip}
            onChange={(e) => handleZipChange(e)}
            variant="outlined"
            className="zip-input"
          />
          <div className="zip-city">{city.name}</div>
        </div>
        <div className="sliders">
          <PreferenceSlider
            title="Temperature"
            unit="°F"
            value={userTemperature}
            handler={handleSliderChange}
            setter={setUserTemperature}
          />
          <PreferenceSlider
            title="Humidity"
            unit="%"
            value={userHumidity}
            handler={handleSliderChange}
            setter={setUserHumidity}
          />
          <PreferenceSlider
            title="Wind"
            unit=" MPH"
            value={userWind}
            handler={handleSliderChange}
            setter={setUserWind}
          />
          <PreferenceSlider
            title="Rain"
            unit="% Chance"
            value={userRain}
            handler={handleSliderChange}
            setter={setUserRain}
          />
        </div>
      </div>
      {/* TODO: Add light/dark based on sunrise/set */}
    </div>
  );
}

export default Preferences;
