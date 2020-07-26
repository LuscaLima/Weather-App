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

form.addEventListener("submit", async event => {
  event.preventDefault()

  weatherData = await getWeather(searchTerm)

  console.log(weatherData)

  displayContent.style.display = "block"
  displayFallback.style.display = "none"

  displayHeader.textContent = weatherData.location.text
  ddwind.textContent = `${weatherData.forecast.current.wind_speed}m/s`
  ddmois.textContent = weatherData.forecast.current.humidity
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
  localStorage.setItem("wacache", parsedData)

  return parsedData
}
