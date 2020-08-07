import React from "react";

function Day({ name, forecasts, preferences }) {
  const forecastElements = forecasts.map((forecast, i) => {
    let time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    return (
      <div className="day-forecasts-segment" key={i}>
        <div
          className="bar"
          style={{
            height: calculateForecastBarHeight(preferences, forecast) + "%",
          }}
        ></div>
        <div className="time">{time}</div>
      </div>
    );
  });

  return (
    <div className="day">
      <h3 className="day-name">{name}</h3>
      <div className="day-forecasts">{forecastElements}</div>
    </div>
  );
}

/**
 * Uses magic to determine how well preferences match a given forecast
 * @param {Object} preferences
 * @param {Object} forecast
 */
function calculateForecastBarHeight(preferences, forecast) {
  const weights = {temp: 30, humidity: 20, wind: 20, rain: 30};
  let height = 0;


  // Temperature
  const kelvinRange = preferences.userTemperature.map(temp => fahrenheitToKelvin(temp));
  if (
    isInRange(kelvinRange,forecast.main.temp)
  ) {
    height += weights.temp;
  }

  // Humidity
  if (isInRange(preferences.userHumidity, forecast.main.humidity)) {
    height += getWeightedHeight(preferences.userHumidity, forecast.main.humidity, weights.humidity);
  }

  // Wind
  if (isInRange(preferences.userWind, forecast.wind.speed)) {
    height += getWeightedHeight(preferences.userWind, forecast.wind.speed, weights.wind);
  }

  // Rain
  // OpenWeatherApi excludes the rain key if none is expected
  if (!forecast.rain) {
    height += weights.rain
  } else if (isInRange(preferences.userRain, forecast.rain["3h"])) {
        height += getWeightedHeight(preferences.userRain, forecast.rain["3h"], weights.rain);
  }
  return height;
}

/**
 * 
 * @param {Array[Number]} range 
 * @param {Number} value 
 * @param {Number} weight 
 */
function getWeightedHeight(range, value, weight) {
  const rangeMean = (range[0] + range[1]) / 2

if (value <= rangeMean) {
    return weight
} else {
    // calculate ratio between max range and value
    return (weight * (range[1] - value + 0 ) / (rangeMean - range[0]))
}

}

/**
 * Convert from Kelvin to Fahrenheit
 * @param {Number} temp
 */
function fahrenheitToKelvin(temp) {
  return (temp - 32) / 1.8 + 273.15;
}

/**
 * Returns True if value is between first and second values of given range
 * @param {Array[Number, Number]} range
 * @param {Number} value
 */
function isInRange(range, value) {
  return value >= range[0] && value <= range[1];
}

export default Day;
