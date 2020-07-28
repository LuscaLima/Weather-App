"use strict"

const D = document

let form = null
let search = null
let searchPlace = null
let searchTerm = ""
let weatherData

/** Get the reference of the form */
form = D.querySelector("form")

/** Get the reference of search field */
search = D.querySelector("#search")

/** Get the reference of search button of the current place */
searchPlace = D.querySelector("#place")

if (!search) {
  throw new Error("The search field was not found")
}

let current = {}
let weather = {}

form.addEventListener("submit", async event => {
  event.preventDefault()

  weatherData = await getWeather(searchTerm)

  console.log(weatherData)

  displayContent.style.display = "flex"
  displayFallback.style.display = "none"

  current = weatherData.forecast.current

  displayHeader.textContent = weatherData.location.text
  ddwind.textContent = `${current.wind_speed}m/s`
  ddmois.textContent = current.humidity

  unityTemp(current.temp, sut.value === "F")
  ddtemp.textContent = current.temp

  weather = weatherData.forecast.current.weather[0]

  ddimg.setAttribute("src", `/img/temp/${weather.icon}@4x.png`)
  ddweat.textContent = weather.main
  ddweatd.textContent = weather.description
  ddfooter.textContent = weatherData.location.place_name
})

search.addEventListener("input", ({ target }) => {
  searchTerm = target.value
})

searchPlace.addEventListener("click", event => {
  event.preventDefault()

  geolocation()
})

/** Get the weather data from API */

async function getWeather(location) {
  const data = await fetch(`http://localhost:8080/api?address=${location}`)
  const parsedData = await data.json()

  localStorage.setItem("term", searchTerm)
  localStorage.setItem("wacache", parsedData)

  return parsedData
}

let unityTemp = celciusToFahrenheit

function fahrenheitToCelcius(fd, pass = false) {
  if (pass) return

  current.temp = (((fd - 32) * 5) / 9).toFixed(2)
}

function celciusToFahrenheit(cd, pass = false) {
  if (pass) return

  current.temp = ((cd * 9) / 5 + 32).toFixed(2)
}
