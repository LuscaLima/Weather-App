const N = navigator

const myPlace = {}

/** Checks if the browser's geolocation API is available */
const verify = () => {
  if (!N || !("geolocation" in N)) {
    alert(
      "I'm sorry, but geolocation services are not supported by your browser."
    )

    return false
  }

  return true
}

/** Setup de current position (coords) of the machine */
const geolocation = () => {
  if (!verify()) {
    return
  }

  N.geolocation.getCurrentPosition(data => {
    for (const key in data) {
      myPlace[key] = data[key]
    }
  })
}
