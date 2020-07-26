const express = require("express")
const router = express.Router()

const geolocation = require("../utils/geolocation")
const forecast = require("../utils/forecast")
const { response } = require("express")

router.get("/", (req, res) => {
  res.render("index", {
    page: {
      title: "Welcome",
      author: "Lusca Lima",
    },
  })
})

router.get("/about", (req, res) => {
  res.render("about", {
    page: {
      title: "About",
      author: "Lusca Lima",
    },
  })
})

router.get("/help", (req, res) => {
  res.render("help", {
    page: {
      title: "Help",
      author: "Lusca Lima",
    },
  })
})

router.get("/api", async (req, res) => {
  let geoData = {}
  const { address } = req.query

  if (!address) {
    return res.json([
      {
        error: "Please, you must provide a address to search term",
      },
    ])
  }

  await geolocation(address)
    .then(response => {
      geoData = response.data.features[0]

      if (!geoData) {
        throw new Error(`Geolocation. No place found for "${address}"`)
      }
    })
    .catch(err => res.json({ error: err.message }))

  /** Get latitude and longitude */
  const [lon, lat] = geoData.center

  await forecast({
    lat,
    lon,
  })
    .then(response => {
      const { id, place_name, context, text } = geoData

      res.json({
        location: {
          id,
          place_name,
          context,
          text,
          coords: {
            lat,
            lon,
          },
        },
        forecast: response.data,
      })
    })
    .catch(err => res.json({ error: err.message }))
})

router.get("*", (req, res) => {
  res.render("error", {
    page: {
      title: "Not Found",
      author: "Lusca Lima",
    },
  })
})

module.exports = router
