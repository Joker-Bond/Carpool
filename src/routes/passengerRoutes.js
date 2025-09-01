const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

// Create a new passenger
router.post('/', passengerController.createPassenger);

// Get all passengers
router.get('/', passengerController.getAllPassengers);

// Get passenger by ID
router.get('/:id', passengerController.getPassengerById);

// Update passenger
router.put('/:id', passengerController.updatePassenger);

// Delete passenger
router.delete('/:id', passengerController.deletePassenger);

module.exports = router;
