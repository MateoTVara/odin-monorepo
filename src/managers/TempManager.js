export class TempManager {
  constructor() {}



  static currentTempUnit = "F";
  static currentFTemp;
  static currentFFeelslike;
  static currentCTemp;
  static currentCFeelslike;

  static #toCelcius(fTemp) {
    return ((fTemp - 32) * (5/9)).toFixed(1);
  }



  /**
   * Toggles the temperature unit between Fahrenheit and Celsius.
   * @returns {Object} An object containing the current temperature and feels-like temperature in the toggled unit.
   */
  static toggleTempUnit() {
    if (this.currentTempUnit === "F") {
      this.currentTempUnit = "C";
      return {
        temp: this.currentCTemp,
        feelslike: this.currentCFeelslike
      };
    } else {
      this.currentTempUnit = "F";
      return {
        temp: this.currentFTemp,
        feelslike: this.currentFFeelslike
      };
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
    this.currentFTemp = data.temp;
    this.currentFFeelslike = data.feelslike;
    this.currentCTemp = this.#toCelcius(this.currentFTemp);
    this.currentCFeelslike = this.#toCelcius(this.currentFFeelslike);
    this.currentTempUnit = "F";
  }
}