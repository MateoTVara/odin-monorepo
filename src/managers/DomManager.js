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
  static #selectDomElements(selectors = {}) {
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

        currentLocation.h2Address.textContent = data.address;
        currentLocation.pDescription.textContent = data.description;
        currentLocation.pConditions.textContent = data.currentConditions.conditions;
        currentLocation.pDatetime.textContent = data.currentConditions.datetime;
        currentLocation.pTemp.textContent = data.currentConditions.temp;
        currentLocation.pFeelslike.textContent = data.currentConditions.feelslike;
        const iconPath  = await AssetManager.getIconPath(data.currentConditions.icon);
        currentLocation.divIcon.style.backgroundImage = `url(${iconPath})`;

        this.browser.inputLocation.value = "";

        TempManager.updateTemps(data.currentConditions);

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
      this.currentLocation.pTemp.textContent = temps.temp;
      this.currentLocation.pFeelslike.textContent = temps.feelslike;
    });
  }
}