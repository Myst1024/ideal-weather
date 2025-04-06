const functions = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const axios = require("axios");

/**
 * CONSTANTS
 */
const OPENWEATHER_API_KEY = defineSecret("OPENWEATHER_API_KEY");
const OPENWEATHER_3HR_URL = "https://api.openweathermap.org/data/2.5/forecast";

/** PUBLIC */
exports.getForecastv2 = functions.https.onRequest(
  { secrets: [OPENWEATHER_API_KEY] },
  async (req, res) => {
    functions.logger.info("ran getForecast");
    setHeaders(req, res);
    if (!req.query.zip) {
      return res
        .status(422)
        .send(
          "The function must be called with " +
            'one argument "zip" containing the zip code to query.'
        );
    }
    const zip = req.query.zip.toString();

    return callOpenWeather(zip)
      .then((forecast) => {
        return res.json(forecast);
      })
      .catch(() => {
        return res.status(503).send("Error from Openweather API");
      });
  }
);

/** PRIVATE */

const setHeaders = function (req, res) {
  var whitelist = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://ideal-weather.web.app",
  ];
  var origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
};

const callOpenWeather = async (zip) => {
  const params = {
    params: { zip: `${zip},us`, appid: OPENWEATHER_API_KEY.value() },
  };

  return axios
    .get(OPENWEATHER_3HR_URL, params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
