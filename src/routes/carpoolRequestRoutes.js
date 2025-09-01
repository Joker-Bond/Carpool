const express = require('express');
const router = express.Router();
const carpoolRequestController = require('../controllers/carpoolRequestController');
const { validateCarpoolRequest } = require('../middlewares/validation');

// Create a new carpool request
router.post('/', validateCarpoolRequest, carpoolRequestController.createCarpoolRequest);

// Retrieve all carpool requests
router.get('/', carpoolRequestController.getAllCarpoolRequests);

// Retrieve a specific carpool request by ID
router.get('/:id', carpoolRequestController.getCarpoolRequestById);

// Update a carpool request
router.put('/:id', validateCarpoolRequest, carpoolRequestController.updateCarpoolRequest);

// Delete a carpool request
router.delete('/:id', carpoolRequestController.deleteCarpoolRequest);

// Join a carpool request
router.post('/:id/join', carpoolRequestController.joinCarpoolRequest);

// Leave a carpool request
router.post('/:id/leave', carpoolRequestController.leaveCarpoolRequest);

module.exports = router;
