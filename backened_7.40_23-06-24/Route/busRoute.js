

const express = require('express');
const router = express.Router();
const {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById
} = require('../controllers/busController');

// Create a new bus record
router.post('/', createBus);

// Get all bus records
router.get('/', getAllBuses);

// Get a single bus record by ID
router.get('/:id',getBusById)

// Update a bus record by ID
router.put('/:id', updateBusById);

// Delete a bus record by ID
router.delete('/:id', deleteBusById);

module.exports = router;
