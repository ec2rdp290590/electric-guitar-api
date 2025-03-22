/**
 * Guitar Model
 * Represents an electric guitar with its properties
 */
class Guitar {
  /**
   * Create a new Guitar
   * @param {number} id - Unique identifier
   * @param {string} brand - Guitar manufacturer (e.g., Fender, Gibson)
   * @param {string} model - Guitar model (e.g., Stratocaster, Les Paul)
   * @param {string} type - Guitar type (e.g., Solid Body, Semi-Hollow)
   * @param {string} color - Guitar color
   * @param {number} price - Guitar price
   * @param {number} yearMade - Year the guitar was manufactured
   */
  constructor(id, brand, model, type, color, price, yearMade) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.type = type;
    this.color = color;
    this.price = price;
    this.yearMade = yearMade;
    this.createdAt = new Date();
  }
}

export default Guitar;
