import React from "react";
import Day from "./Day";
import "./Forecast.scss";

function Forecast({ forecastList, preferences }) {
  /**
   * Returns shortened english weekday IE 'Mon', 'Tue'
   * @param {Date} dateTime
   */
  function formatWeekday(dateTime) {
    const options = { weekday: "short" };
    const region = "en-US";
    return new Intl.DateTimeFormat(region, options).format(dateTime);
  }

  /**
   * Returns an array of days of forecasts, ordered chronologically
   * @param {Object} forecastList
   */
  function buildDays(forecastList) {
    const daysMap = new Map();

    forecastList.forEach((forecast, i) => {
      const dateTime = new Date(forecast.dt * 1000);
      const weekdayShort = formatWeekday(dateTime);

      let day;
      if (daysMap.has(weekdayShort)) {
        // If weekday is already in map, get reference to existing forecast array
        day = daysMap.get(weekdayShort);
      } else {
        // Otherwise populate the new key
        day = daysMap.set(weekdayShort, []).get(weekdayShort);
      }

      day.push(forecast);
    });
    const days = [];
    daysMap.forEach((forecasts, weekday) => {
      days.push({ weekday: weekday, forecasts: forecasts });
    });
    return days;
  }

  const days = [];
  forecastList &&
    buildDays(forecastList).forEach((day) => {
      days.push(
        <Day
          key={day.weekday}
          name={day.weekday}
          forecasts={day.forecasts}
          preferences={preferences}
        />
      );
    });
  return (
    <div className="forecast card">
      <h3 className="header">Forecast</h3>
      <div className="day-list">{days}</div>
    </div>
  );
}

export default Forecast;
