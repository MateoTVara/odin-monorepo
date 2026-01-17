export class ApiManager {
  constructor() {}



  static #API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  static #API_KEY = "UAXP4XG9XM4TK66CC7DHXAGHL";


  
  /**
   * Fetches weather data for a specific location.
   * @param {string} location - The location to fetch weather data for.
   * @returns {Promise<object>} The weather data for the specified location.
   * @throws {TypeError} If location is not a string.
   * @throws {Error} If there is an error fetching the weather data.
   */
  static async getWeather(location){
    try {
      if(typeof location !== "string") {
        throw new TypeError("location must be a string");
      }
  
      const response = await fetch(`${this.#API_URL + location + "?key="+ this.#API_KEY}`);
  
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
}