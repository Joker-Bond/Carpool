const CarOwnerService = require('../services/carOwnerService');
const { validationResult } = require('express-validator');

/**
 * Create a new car owner.
 * Expected body: { name: string, email: string, phone: string }
 */
const createCarOwner = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const carOwner = await CarOwnerService.createCarOwner(req.body);
    return res.status(201).json(carOwner);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a car owner by ID.
 */
const getCarOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carOwner = await CarOwnerService.getCarOwnerById(id);
    if (!carOwner) {
      return res.status(404).json({ message: 'Car owner not found' });
    }
    return res.json(carOwner);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all car owners with optional pagination.
 */
const getAllCarOwners = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await CarOwnerService.getAllCarOwners({ page, limit });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Update an existing car owner.
 * Expected body may contain any updatable fields.
 */
const updateCarOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updated = await CarOwnerService.updateCarOwner(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Car owner not found' });
    }
    return res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a car owner by ID.
 */
const deleteCarOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await CarOwnerService.deleteCarOwner(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Car owner not found' });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCarOwner,
  getCarOwner,
  getAllCarOwners,
  updateCarOwner,
  deleteCarOwner,
};
