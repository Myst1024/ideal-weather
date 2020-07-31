import React, { useState } from "react";
import Day from "./Day";

function Forecast() {
  return (
    <div className="forecast">
      <h3 className="header">Forecast</h3>
      <div className="day-list">
        <Day name="Wednesday" />
      </div>
    </div>
  );
}

export default Forecast;
