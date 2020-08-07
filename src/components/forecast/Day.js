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
 * Uses arbitrary magic to determine how well preferences match a given forecast
 * @param {Object} preferences
 * @param {Object} forecast
 */
function calculateForecastBarHeight(preferences, forecast) {
  //const weights = {temp: 75, humidity: 55, wind: 40, rain: 100};
  const weights = {temp: 80, humidity: 70, wind: 60, rain:100};
  let height = 100;

  // Temperature
  const kelvinRange = preferences.userTemperature.map(temp => fahrenheitToKelvin(temp));
  console.log(forecast.main.temp)
  height -= getWeightedNegatives(kelvinRange, forecast.main.temp) * weights.temp;
  console.log(height)
  
  // Humidity
  height -= getWeightedNegatives(preferences.userHumidity, forecast.main.humidity) * weights.humidity
  
  // Wind
  height -= getWeightedNegatives(preferences.userWind, forecast.wind.speed) * weights.wind;
  

  // Rain
  // OpenWeatherApi excludes the rain key if none is expected
  if (!forecast.rain) {
    height += 0
  } else {
    height -= getWeightedNegatives(preferences.userRain, forecast.rain["3h"]) * weights.rain;
  }

  return height;
}

/**
 * Gets a ratio between a cosine curve with given range and a value
 * @param {Array[Number]} range 
 * @param {Number} value 
 */
function getCosineCurve(range,value) {
  console.log(range, value)
  let lowerBound = range[0] === 0 ? -range[1] : range[0]
  let upperBound = range[1];
  // If the lower range is 0, assume that 0 is ideal instead of the mean.  Thus we stretch the sine wave by 2 and shift it back by 1
  if (range[0] === 0) {
    lowerBound = range[1] * -1
    upperBound *= 2
  }

  return .5 * Math.cos((value - lowerBound) * Math.PI * 2 / upperBound) + .5
}

/**
 * 
 * @param {Array[Number]} range 
 * @param {Number} value 
 */
function getWeightedNegatives(range, value) {
  if (value <= range[0]) {
      return 1
  } else if (value >= range[1]) {
      return 1
  } else {
      return getCosineCurve(range, value)
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
