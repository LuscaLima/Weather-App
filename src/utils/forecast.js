const axios = require("axios").default

const key = process.env.OWM_KEY

/**
 * Fetch an amount of weather data about the searched place through the OWP's API
 * @param {Object} coords contains the latitude and longitute of the search address
 * @param {Function} callback executed when the request is resolved
 */

function forecast(coords, callback) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,daily&appid=${key}`

  return axios.get(url)
}

module.exports = forecast
