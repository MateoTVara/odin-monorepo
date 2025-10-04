import { parseISO, format } from "date-fns";
import { ApiManager, AssetManager, TempManager } from "../managers";

export class DomManager {
  constructor() {}



  /**
   * A reference to the button that toggles the temperature unit between Fahrenheit and Celsius.
   * @type {HTMLElement}
   */
  static btnToggle = DomManager.#selectDomElements({
    btnToggle: "main > button:first-child",
  }).btnToggle;



  /**
   * An object containing references to key DOM elements for the location input and search button.
   * @type {Object}
   * @property {HTMLElement} inputLocation - The input field for entering the location.
   * @property {HTMLElement} btnSearch - The button to initiate the search for weather data.
   */
  static browser = DomManager.#selectDomElements({
    inputLocation: "div.browser > input#location",
    btnSearch: "div.browser > button",
  });



  /**
   * An object containing references to key DOM elements for displaying weather information.
   * @type {Object}
   * @property {HTMLElement} h2Address - The element displaying the address.
   * @property {HTMLElement} pDescription - The element displaying the weather description.
   * @property {HTMLElement} divIcon - The element displaying the weather icon.
   * @property {HTMLElement} pConditions - The element displaying the weather conditions.
   * @property {HTMLElement} pDatetime - The element displaying the date and time.
   * @property {HTMLElement} pTemp - The element displaying the temperature.
   * @property {HTMLElement} pFeelslike - The element displaying the feels-like temperature.
   */
  static currentLocation = DomManager.#selectDomElements({
    h2Address: "div.current-location > #address",
    pDescription: "div.current-location > .description",
    divIcon: "div.current-location > .icon",
    pConditions: "div.current-location > .conditions",
    pDatetime: "div.current-location > .datetime",
    pTemp: "div.current-location > .temperatures .temp",
    pFeelslike: "div.current-location > .temperatures .feelslike",
    pTempLabel: "div.current-location > .temperatures > div:first-child > .label",
    pFeelslikeLabel: "div.current-location > .temperatures > div:last-child > .label",
  });



  /**
   * An array of objects, each containing references to key DOM elements for displaying forecast information.
   * @type {Array<Object>}
   * @property {HTMLElement} h3Day - The element displaying the day of the forecast.
   * @property {HTMLElement} pDescription - The element displaying the weather description.
   * @property {HTMLElement} divIcon - The element displaying the weather icon.
   * @property {HTMLElement} pConditions - The element displaying the weather conditions.
   * @property {HTMLElement} pTemp - The element displaying the temperature.
   * @property {HTMLElement} pFeelslike - The element displaying the feels-like temperature.
   */
  static forecasts = [...document.querySelectorAll(".forecast")].map(forecastEl => {
    return DomManager.#selectDomElements({
      h3Day: "h3.day",
      pDescription: "p.description",
      divIcon: "div.icon",
      pConditions: "p.conditions",
      pTemp: "div.temperatures > .temp",
      pFeelslike: "div.temperatures > .feelslike",
    }, forecastEl);
  });



  /**
   * Selects multiple DOM elements based on the provided CSS selectors.
   * @param {object} selectors - An object where keys are names and values are CSS selector strings.
   * @param {HTMLElement} [parentEle=document] - The parent element to scope the query (default is the entire document).
   * @returns {object} An object containing the selected DOM elements.
   * @throws {TypeError} If selectors is not an object or if any selector is not a string.
   */
  static #selectDomElements(selectors = {}, parentEle = document) {
    if (typeof selectors !== "object") {
      throw new TypeError("selector must be an object");
    }

    const elements = {};

    Object.entries(selectors).forEach(([key, value]) => {
      if (typeof value !== "string") {
        throw new TypeError("selector must be a string");
      }
      elements[key] = parentEle.querySelector(value);
    });

    return elements
  }



  /**
   * Initializes event listeners for dom elements.
   */
  static initEventListeners() {
    this.browser.btnSearch.addEventListener("click", async () => {
      try {
        let data = {};
        const location = this.browser.inputLocation.value.trim();
        const currentLocation = this.currentLocation;

        if(!location) {
          throw new Error("Not valid input");
        }

        currentLocation.h2Address.textContent = "Loading...";
        data = await ApiManager.getWeather(location);
        const u = TempManager.currentTempUnit;

        currentLocation.h2Address.textContent = data.address;
        currentLocation.pDescription.textContent = data.description;
        currentLocation.pConditions.textContent = data.currentConditions.conditions;
        currentLocation.pDatetime.textContent = data.currentConditions.datetime;
        currentLocation.pTemp.textContent = `${data.currentConditions.temp}°${u}`;
        currentLocation.pFeelslike.textContent = `${data.currentConditions.feelslike}°${u}`;
        currentLocation.pTempLabel.classList.add("active");
        currentLocation.pFeelslikeLabel.classList.add("active");
        const iconPath  = await AssetManager.getIconPath(data.currentConditions.icon);
        currentLocation.divIcon.style.backgroundImage = `url(${iconPath})`;

        this.forecasts.forEach(async (forecast, index) => {
          const dayData = data.days[index + 1];
          const date = parseISO(dayData.datetime);
          const u = TempManager.currentTempUnit;
          forecast.h3Day.textContent = format(date, "EEEE");
          forecast.pDescription.textContent = dayData.description;
          forecast.pConditions.textContent = dayData.conditions;
          forecast.pTemp.textContent = `${dayData.temp}°${u}`;
          forecast.pFeelslike.textContent = `${dayData.feelslike}°${u}`;
          const iconPath = await AssetManager.getIconPath(dayData.icon);
          forecast.divIcon.style.backgroundImage = `url(${iconPath})`;
        });

        this.browser.inputLocation.value = "";

        TempManager.updateTemps(data);

      } catch (err) {
        console.log(err);
        this.currentLocation.h2Address.textContent = "Could not load weather data 😞";
      }
    });



    this.browser.inputLocation.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        this.browser.btnSearch.click();
      }
    });



    this.btnToggle.addEventListener("click", () => {
      const temps = TempManager.toggleTempUnit();
      const u = TempManager.currentTempUnit;
      this.currentLocation.pTemp.textContent = `${temps.temp}°${u}`;
      this.currentLocation.pFeelslike.textContent = `${temps.feelslike}°${u}`;
      this.btnToggle.textContent = `${TempManager.currentTempUnit}°`;

      this.forecasts.forEach((forecast, index) => {
        const forecastKey = `forecast${index + 1}`;
        forecast.pTemp.textContent = `${temps[forecastKey].temp}°${u}`;
        forecast.pFeelslike.textContent = `${temps[forecastKey].feelslike}°${u}`;
      });
    });
  }
}