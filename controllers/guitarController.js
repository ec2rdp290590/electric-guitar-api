// Import the Guitar model
import Guitar from '../models/Guitar.js';

// In-memory database (for simplicity)
let guitars = [];
let nextId = 1;

/**
 * Get all guitars
 * @route GET /api/guitars
 * @returns {Array} - Array of all guitars
 */
export const getAllGuitars = (req, res) => {
  try {
    res.status(200).json(guitars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a specific guitar by ID
 * @route GET /api/guitars/:id
 * @param {string} id - Guitar ID
 * @returns {Object} - Guitar object
 */
export const getGuitarById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const guitar = guitars.find(g => g.id === id);
    
    if (!guitar) {
      return res.status(404).json({ message: 'Guitar not found' });
    }
    
    res.status(200).json(guitar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new guitar
 * @route POST /api/guitars
 * @param {Object} body - Guitar data
 * @returns {Object} - New guitar object
 */
export const createGuitar = (req, res) => {
  try {
    const { brand, model, type, color, price, yearMade } = req.body;
    
    // Validate required fields
    if (!brand || !model || !price) {
      return res.status(400).json({ message: 'Brand, model, and price are required fields' });
    }
    
    // Create new guitar instance
    const newGuitar = new Guitar(
      nextId++,
      brand,
      model,
      type || 'Solid Body',
      color || 'Black',
      parseFloat(price),
      yearMade ? parseInt(yearMade) : new Date().getFullYear()
    );
    
    // Add to our "database"
    guitars.push(newGuitar);
    
    res.status(201).json(newGuitar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update an existing guitar
 * @route PUT /api/guitars/:id
 * @param {string} id - Guitar ID
 * @param {Object} body - Updated guitar data
 * @returns {Object} - Updated guitar object
 */
export const updateGuitar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const guitarIndex = guitars.findIndex(g => g.id === id);
    
    if (guitarIndex === -1) {
      return res.status(404).json({ message: 'Guitar not found' });
    }
    
    // Get current guitar data
    const currentGuitar = guitars[guitarIndex];
    
    // Update with new data (only provided fields)
    const updatedGuitar = {
      ...currentGuitar,
      brand: req.body.brand || currentGuitar.brand,
      model: req.body.model || currentGuitar.model,
      type: req.body.type || currentGuitar.type,
      color: req.body.color || currentGuitar.color,
      price: req.body.price ? parseFloat(req.body.price) : currentGuitar.price,
      yearMade: req.body.yearMade ? parseInt(req.body.yearMade) : currentGuitar.yearMade
    };
    
    // Update in our "database"
    guitars[guitarIndex] = updatedGuitar;
    
    res.status(200).json(updatedGuitar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a guitar
 * @route DELETE /api/guitars/:id
 * @param {string} id - Guitar ID
 * @returns {Object} - Success message
 */
export const deleteGuitar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const guitarIndex = guitars.findIndex(g => g.id === id);
    
    if (guitarIndex === -1) {
      return res.status(404).json({ message: 'Guitar not found' });
    }
    
    // Remove from our "database"
    guitars.splice(guitarIndex, 1);
    
    res.status(200).json({ message: 'Guitar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
