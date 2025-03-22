// Import Express and controller
import express from 'express';
import * as guitarController from '../controllers/guitarController.js';

// Create router instance
const router = express.Router();

/**
 * Guitar Routes
 * These routes handle all CRUD operations for electric guitars
 */

// GET all guitars
router.get('/', guitarController.getAllGuitars);

// GET a specific guitar by ID
router.get('/:id', guitarController.getGuitarById);

// POST create a new guitar
router.post('/', guitarController.createGuitar);

// PUT update an existing guitar
router.put('/:id', guitarController.updateGuitar);

// DELETE a guitar
router.delete('/:id', guitarController.deleteGuitar);

export default router;
