import React from "react";

function Day({ name, forecasts, preferences }) {

  function calculateForecastBarHeight(forecast) {
    console.log(forecast)
    let height = 0;
    if (
        forecast.main.temp_min >= convertFahrenheit(preferences.userTemperature[0]) &&
        forecast.main.temp_max <= convertFahrenheit(preferences.userTemperature[1])
      ) {
      height += 30
    }
    if (forecast.main.humidity >= preferences.userHumidity[0] && forecast.main.humidity <= preferences.userHumidity[1]) {
      height += 20 // TODO make an isInRange method to abstract this trash
    }
    return height
  }

  console.log(forecasts)
  console.log(preferences)
  const forecastElements = forecasts.map(forecast => {
    return (
      <div>{calculateForecastBarHeight(forecast)}</div>
    )
  })

  return (
    <div className="day">
      <h3 className="day-name">{name}</h3>
      <div className="forecast-list">
    {forecastElements}
      </div>
    </div>
  );
}

function convertFahrenheit(temp) {
  return ((temp-32)/1.8)+273.15
} 



export default Day;
