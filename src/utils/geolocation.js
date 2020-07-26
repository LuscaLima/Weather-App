const axios = require("axios").default

const key = process.env.MB_KEY

/**
 * Search for the coordinates of the given place
 * @param {String} locale defines the address or place to search for the coords
 * @param {Function} callback executed when the request is resolved
 */

function geolocation(locale, callback) {
  return axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      locale
    )}.json?access_token=${key}&limit=1`
  )
}

module.exports = geolocation
