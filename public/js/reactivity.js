const sut = D.querySelector("#sut")
const suw = D.querySelector("#suw")
const dut = D.querySelector("#dut")

sut.addEventListener("change", ({ target }) => {
  const value = target.value.toString().toUpperCase()
  dut.textContent = value

  unityTemp = value === "F" ? celciusToFahrenheit : fahrenheitToCelcius

  unityTemp(current.temp)
  ddtemp.textContent = current.temp
})

const displayContent = D.querySelector(".display-content")
const displayHeader = D.querySelector(".display-header")

const ddwind = D.querySelector(".dd-wind span")
const ddmois = D.querySelector(".dd-mois span")
const ddtemp = D.querySelector(".dd-temp span")
const ddimg = D.querySelector(".dd-img")
const ddweat = D.querySelector(".dd-weat")
const ddweatd = D.querySelector(".dd-weatd")
const ddfooter = D.querySelector(".dd-footer")

const displayFallback = D.querySelector(".display-fallback")

displayContent.style.display = "none"
