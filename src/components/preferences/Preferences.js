import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";

function Preferences({
  userTemperature,
  setUserTemperature,
  userHumidity,
  setUserHumidity,
  userWind,
  setUserWind,
}) {
  const handleChange = (event, newValue, setter) => {
    setter(newValue);
  };

  return (
    <div className="preferences">
      <h3 className="header">Preferences</h3>
      <div className="preferences-slider">
        <div className="label">Temperature (F)</div>
        <Slider
          value={userTemperature}
          valueLabelDisplay="on"
          onChange={(e, v) => handleChange(e, v, setUserTemperature)}
          aria-labelledby="range-slider"
        />
      </div>
      <div className="preferences-slider">
        <div className="label">Humidity (%)</div>

        <Slider
          value={userHumidity}
          valueLabelDisplay="on"
          onChange={(e, v) => handleChange(e, v, setUserHumidity)}
          aria-labelledby="range-slider"
        />
      </div>
      <div className="preferences-slider">
        <div className="label">Wind (MPH)</div>

        <Slider
          value={userWind}
          valueLabelDisplay="on"
          onChange={(e, v) => handleChange(e, v, setUserWind)}
          aria-labelledby="range-slider"
        />
      </div>
    </div>
  );
}

export default Preferences;
