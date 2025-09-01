const express = require('express');
const router = express.Router();

const carOwnerController = require('../controllers/carOwnerController');
const { validateCarOwner } = require('../middlewares/validation');

// Create a new car owner
router.post('/', validateCarOwner, carOwnerController.createCarOwner);

// Get all car owners
router.get('/', carOwnerController.getAllCarOwners);

// Get a car owner by ID
router.get('/:id', carOwnerController.getCarOwnerById);

// Update a car owner by ID
router.put('/:id', validateCarOwner, carOwnerController.updateCarOwner);

// Delete a car owner by ID
router.delete('/:id', carOwnerController.deleteCarOwner);

module.exports = router;
