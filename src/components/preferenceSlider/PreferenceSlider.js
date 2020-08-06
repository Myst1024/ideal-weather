import React from "react";
import { Slider } from "@material-ui/core";

function PreferenceSlider({ title, unit, value, handler, setter }) {
  return (
    <div className="preferences-slider">
      <div className="label">{`${title}: ${value[0]}-${value[1]}${unit}`}</div>
      <Slider
        value={value}
        valueLabelDisplay="auto"
        onChange={(e, v) => handler(e, v, setter)}
        aria-labelledby="range-slider"
      />
    </div>
  );
}

export default PreferenceSlider;
