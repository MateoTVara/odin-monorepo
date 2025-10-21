import Gameboard from "./gameboard.js";

class Player {
  /**
   * Create a player.
   * @param {"real"|"computer"} type - The type of player ("real" or "computer").
   * @param {Gameboard} gameboard - The gameboard associated with the player.
   */
  constructor(type, gameboard) {
    if (type !== "real" && type !== "computer") {
      throw new Error('Player type must be either "real" or "computer".');
    }
    this.type = type;
    this.gameboard = gameboard;
  }
}

export default Player;