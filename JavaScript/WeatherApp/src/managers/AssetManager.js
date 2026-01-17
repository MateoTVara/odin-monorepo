export class AssetManager {
  constructor() {}


  
  /**
   * Imports and returns the path of an icon based on the provided icon name.
   * @param {string} iconName - The name of the icon to import.
   * @returns {Promise<string>} The URL of the icon.
   */
  static async getIconPath(iconName) {
    try {
      const iconModule = await import(`../assets/icons/${iconName}.svg`);
      const url = iconModule?.default;
      return url
    } catch(err) {
      console.error(err);
    }
  }
}