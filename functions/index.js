const functions = require('firebase-functions');
const axios = require("axios");
//const admin = require("firebase-admin");

/**
 * CONSTANTS
 */
const ENVIRONMENT = functions.config();
const OPENWEATHER_API_KEY = ENVIRONMENT['ideal-weather'].key;
const OPENWEATHER_3HR_URL = "https://api.openweathermap.org/data/2.5/forecast";

/** PUBLIC */
exports.getForecast = functions.https.onRequest((req, res) => {

    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (!req.query.zip) {
        return res.status(422).send('The function must be called with ' +
        'one argument "zip" containing the zip code to query.')
    }
    const zip = req.query.zip.toString();

    callOpenWeather(zip)
        .then((forecast) => {
            return res.json(forecast);
        })
        .catch(() => {
            return res.status(503).send('Error from Openweather API');
        });
    functions.logger.info("ran getForecast");
});

/** PRIVATE */
const callOpenWeather = async (zip) => {
    const params = {
        params: { zip: `${zip},us`, appid: OPENWEATHER_API_KEY },
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
