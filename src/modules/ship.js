class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  /**
   * Register a hit on the ship.
   */
  hit() {
    this.timesHit++;
  }

  /**
   * Check if the ship is sunk.
   * @returns {boolean} - True if the ship is sunk, false otherwise.
   */
  isSunk() {
    return this.timesHit >= this.length;
  }
}

export default Ship;