export class TempManager {
  constructor() {}



  static currentTempUnit = "F";
  
  static currentFTemp;
  static currentFFeelslike;
  static currentCTemp;
  static currentCFeelslike;

  static forecastOneFTemp;
  static forecastOneFFeelslike;
  static forecastOneCTemp;
  static forecastOneCFeelslike;

  static forecastTwoFTemp;
  static forecastTwoFFeelslike;
  static forecastTwoCTemp;
  static forecastTwoCFeelslike;

  static forecastThreeFTemp;
  static forecastThreeFFeelslike;
  static forecastThreeCTemp;
  static forecastThreeCFeelslike;  



  /**
   * Converts a temperature from Fahrenheit to Celsius.
   * @param {number} fTemp - The temperature in Fahrenheit.
   * @returns {number} The temperature in Celsius.
   */
  static #toCelcius(fTemp) {
    return ((fTemp - 32) * (5/9)).toFixed(1);
  }



  /**
   * Toggles the temperature unit between Fahrenheit and Celsius.
   * @returns {Object} An object containing the current temperature and feels-like temperature in the toggled unit.
   */
  static toggleTempUnit() {
    this.currentTempUnit = this.currentTempUnit === "F" ? "C" : "F";
    const unit = this.currentTempUnit;

    const getPair = (prefix) => ({
      temp: this[`${prefix}${unit}Temp`],
      feelslike: this[`${prefix}${unit}Feelslike`],
    });

    return {
      ...getPair("current"),
      forecast1: getPair("forecastOne"),
      forecast2: getPair("forecastTwo"),
      forecast3: getPair("forecastThree"),
    }
  }


  
  /**
   * Updates the temperature values based on the provided data.
   * @param {Object} data - The weather data containing direct temperature information.
   * @throws Will throw an error if the data is not a valid object.
   */
  static updateTemps(data) {
    if (typeof data !== 'object' || data === null) {
      throw new Error("Invalid data provided to updateTemps");
    }

    const currentConditions = data.currentConditions || data;
    const days = data.days || [];

    this.currentFTemp = currentConditions.temp;
    this.currentFFeelslike = currentConditions.feelslike;
    this.currentCTemp = this.#toCelcius(this.currentFTemp);
    this.currentCFeelslike = this.#toCelcius(this.currentFFeelslike);

    this.forecastOneFTemp = days[1].temp;
    this.forecastOneFFeelslike = days[1].feelslike;
    this.forecastOneCTemp = this.#toCelcius(this.forecastOneFTemp);
    this.forecastOneCFeelslike = this.#toCelcius(this.forecastOneFFeelslike);

    this.forecastTwoFTemp = days[2].temp;
    this.forecastTwoFFeelslike = days[2].feelslike;
    this.forecastTwoCTemp = this.#toCelcius(this.forecastTwoFTemp);
    this.forecastTwoCFeelslike = this.#toCelcius(this.forecastTwoFFeelslike);

    this.forecastThreeFTemp = days[3].temp;
    this.forecastThreeFFeelslike = days[3].feelslike;
    this.forecastThreeCTemp = this.#toCelcius(this.forecastThreeFTemp);
    this.forecastThreeCFeelslike = this.#toCelcius(this.forecastThreeFFeelslike);

    this.currentTempUnit = "F";
  }
}