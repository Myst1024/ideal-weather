import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const WEIGHTED_TIER_RATIO = 0.25; // Ratio defining % of preference range to weight less
const WEIGHTED_TIER_MULTIPLIER = 0.6; // Amount to reduce negative weight if within ratio

function Day({ name, forecasts, preferences }) {
  const forecastElements = forecasts.map((forecast, i) => {
    let time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const HoverForecast = (
      <div className="forecast-tooltip">
        <div>
          {`Temp: ${Math.round(kelvinToFahrenheit(forecast.main.temp))}°F`}{" "}
        </div>
        <div> {`Humidity: ${forecast.main.humidity}%`} </div>
        <div> {`Wind: ${Math.round(msToMph(forecast.wind.speed))} MPH`} </div>
        <div> {`Rain: ${forecast.rain ? forecast.rain["3h"] : 0}%`}</div>
      </div>
    );

    return (
      <Tooltip key={i} TransitionComponent={Zoom} arrow title={HoverForecast}>
        <div className="day-forecasts-segment">
          <div
            className="bar"
            style={{
              height: calculateForecastBarHeight(preferences, forecast) + "%",
            }}
          ></div>

          <div className="time">{time}</div>
        </div>
      </Tooltip>
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
  const weights = { temp: 80, humidity: 60, wind: 50, rain: 100 };
  let negativesSum = 0;

  // Temperature
  const kelvinRange = preferences.userTemperature.map((temp) =>
    fahrenheitToKelvin(temp)
  );
  if (!isInRange(kelvinRange, forecast.main.temp)) {
    negativesSum += weights.temp;
  } else if (isInTieredRange(kelvinRange, forecast.main.temp)) {
    negativesSum += weights.temp * WEIGHTED_TIER_MULTIPLIER;
  }

  // Humidity
  if (!isInRange(preferences.userHumidity, forecast.main.humidity)) {
    negativesSum += weights.humidity;
  } else if (
    isInTieredRange(preferences.userHumidity, forecast.main.humidity)
  ) {
    negativesSum += weights.humidity * WEIGHTED_TIER_MULTIPLIER;
  }

  // Wind
  if (!isInRange(preferences.userWind, msToMph(forecast.wind.speed))) {
    negativesSum += weights.wind;
  } else if (
    isInTieredRange(preferences.userWind, msToMph(forecast.wind.speed))
  ) {
    negativesSum += weights.wind * WEIGHTED_TIER_MULTIPLIER;
  }

  // Rain
  // OpenWeatherApi excludes the rain key if none is expected
  if (forecast.rain) {
    if (!isInRange(preferences.userRain, forecast.rain["3h"])) {
      negativesSum += weights.rain;
    } else if (isInTieredRange(preferences.userRain, forecast.rain["3h"])) {
      console.log("weighted rain");
      negativesSum += weights.rain * WEIGHTED_TIER_MULTIPLIER;
    }
  }

  const height = Math.max(0, 100 - negativesSum);
  return height;
}

/**
 * Convert from Kelvin to Fahrenheit
 * @param {Number} temp
 */
function fahrenheitToKelvin(temp) {
  return (temp - 32) / 1.8 + 273.15;
}

/**
 * Convert from Fahrenheit to Kelvin
 * @param {Number} temp
 */
function kelvinToFahrenheit(temp) {
  return ((temp - 273.15) * 9) / 5 + 32;
}

/**
 * Convert from M/S to MPH
 * @param {Number} temp
 */
function msToMph(speed) {
  return speed * 2.237;
}

/**
 * Returns True if value is between first and second values of given range
 * @param {Array[Number, Number]} range
 * @param {Number} value
 */
function isInRange(range, value) {
  return value >= range[0] && value <= range[1];
}

/**
 * Returns True if value is between first and second values of given range
 * modified by WEIGHTED_TIER_RATIO
 * @param {Array[Number, Number]} range
 * @param {Number} value
 */
function isInTieredRange(range, value) {
  const difference = range[1] - range[0];
  const weightedDifference = difference * WEIGHTED_TIER_RATIO;
  // if min value of range is 0, assume that is ideal and not the minimum bearable
  if (range[0] === 0) {
    return value > range[1] - weightedDifference;
  }
  return (
    value < range[0] + weightedDifference ||
    value > range[1] - weightedDifference
  );
}

export default Day;
