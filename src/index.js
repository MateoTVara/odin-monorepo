// index.js

import "./styles.css";

const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = "UAXP4XG9XM4TK66CC7DHXAGHL";

// Browser container elements
const {inputLocation, btnSearch} = selectDomElements({
  inputLocation: "div.browser > input#location",
  btnSearch: "div.browser > button",
});

// Current location weather container elements
const {h2Address, pDescription, divIcon, pConditions, pDatetime, pTemp, pFeelslike} = selectDomElements({
  h2Address: "div.current-location > #address",
  pDescription: "div.current-location > #description",
  divIcon: "div.current-location > .icon",
  pConditions: "div.current-location > .conditions",
  pDatetime: "div.current-location > .datetime",
  pTemp: "div.current-location > .temperatures > .temp",
  pFeelslike: "div.current-location > .temperatures > .feelslike",
});

/**
 * Selects multiple DOM elements based on the provided CSS selectors.
 * @param {object} selectors - An object where keys are names and values are CSS selector strings.
 * @returns {object} An object containing the selected DOM elements.
 * @throws {TypeError} If selectors is not an object or if any selector is not a string.
 */
function selectDomElements(selectors = {}) {
  if (typeof selectors !== "object") {
    throw new TypeError("selector must be an object");
  }

  const elements = {};

  Object.entries(selectors).forEach(([key, value]) => {
    if (typeof value !== "string") {
      throw new TypeError("selector must be a string");
    }
    elements[key] = document.querySelector(value);
  });

  return elements
}

/**
 * Fetches weather data for a specific location.
 * @param {string} location - The location to fetch weather data for.
 * @returns {Promise<object>} The weather data for the specified location.
 * @throws {TypeError} If location is not a string.
 * @throws {Error} If there is an error fetching the weather data.
 */
async function getWeather(location){
  try {
    if(typeof location !== "string") {
      throw new TypeError("location must be a string");
    }

    const response = await fetch(`${API_URL + location + "?key="+ API_KEY}`);

    if(!response.ok) {
      throw new Error("Error fetching weather data");
    }

    const data = await response.json();
    console.log(data);

    return data;

  } catch (err) {
    throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
  }
}

/**
 * Sets the weather data in the DOM elements.
 * @param {object} data - The weather data to set.
 */
function setWeatherData(data){
  h2Address.textContent = data.address;
  pDescription.textContent = data.description;
  divIcon.textContent = data.currentConditions.icon;
  pConditions.textContent = data.currentConditions.conditions;
  pDatetime.textContent = data.currentConditions.datetime;
  pTemp.textContent = data.currentConditions.temp;
  pFeelslike.textContent = data.currentConditions.feelslike;
}

btnSearch.addEventListener("click", async () => {
  try {
    let data = {};
    if(!inputLocation.value.trim()){
      console.log("Not valid input");
    } else {
      h2Address.textContent = "Loading...";
      data = await getWeather(inputLocation.value);
    }
    setWeatherData(data);
    inputLocation.value = "";
  } catch(err) {
    console.log(err);
    h2Address.textContent = "Could not load weather data 😞";
  }
});

inputLocation.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    btnSearch.click();
  }
});