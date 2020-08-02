import React from "react";

function Day({ name, forecasts, preferences }) {
  const forecastElements = forecasts.map((forecast) => {
    return (
      <div
        style={{
          height: calculateForecastBarHeight(preferences, forecast) + "%",
        }}
      ></div>
    );
  });

  return (
    <div className="day">
      <h3 className="day-name">{name}</h3>
      <div className="day-forecasts">{forecastElements}</div>
    </div>
  );
}
function calculateForecastBarHeight(preferences, forecast) {
  let height = 0;
  if (
    forecast.main.temp_min >=
      convertFahrenheit(preferences.userTemperature[0]) &&
    forecast.main.temp_max <= convertFahrenheit(preferences.userTemperature[1])
  ) {
    height += 30;
  }

  if (isInRange(preferences.userHumidity, forecast.main.humidity)) {
    height += 20; // TODO make an isInRange method to abstract this trash
  }

  if (isInRange(preferences.userWind, forecast.wind.speed)) {
    height += 20;
  }

  if (forecast.rain && isInRange(preferences.userRain, forecast.rain["3h"])) {
    height += 30;
  }
  return height;
}
function convertFahrenheit(temp) {
  return (temp - 32) / 1.8 + 273.15;
}

function isInRange(range, value) {
  return value >= range[0] && value <= range[1];
}

export default Day;
