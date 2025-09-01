'use strict';

const CarpoolRequestService = require('../services/carpoolRequestService');

/**
 * Controller for handling carpool request operations.
 * All functions are async and use try/catch to forward errors to Express error middleware.
 */
const carpoolRequestController = {
  /**
   * Create a new carpool request.
   */
  async create(req, res, next) {
    try {
      const { driverId, passengerId, departureTime, origin, destination, seatsRequested } = req.body;
      const newRequest = await CarpoolRequestService.create({
        driverId,
        passengerId,
        departureTime,
        origin,
        destination,
        seatsRequested,
      });
      return res.status(201).json(newRequest);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Retrieve all carpool requests with optional query filters.
   */
  async getAll(req, res, next) {
    try {
      const filters = req.query || {};
      const requests = await CarpoolRequestService.getAll(filters);
      return res.status(200).json(requests);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Retrieve a single carpool request by its ID.
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const request = await CarpoolRequestService.getById(id);
      if (!request) {
        return res.status(404).json({ message: 'Carpool request not found' });
      }
      return res.status(200).json(request);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Update an existing carpool request.
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updated = await CarpoolRequestService.update(id, updateData);
      if (!updated) {
        return res.status(404).json({ message: 'Carpool request not found' });
      }
      return res.status(200).json(updated);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Delete a carpool request.
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await CarpoolRequestService.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Carpool request not found' });
      }
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Accept a carpool request (typically by the driver).
   */
  async accept(req, res, next) {
    try {
      const { id } = req.params;
      const accepted = await CarpoolRequestService.accept(id);
      if (!accepted) {
        return res.status(404).json({ message: 'Carpool request not found' });
      }
      return res.status(200).json(accepted);
    } catch (err) {
      return next(err);
    }
  },

  /**
   * Reject a carpool request.
   */
  async reject(req, res, next) {
    try {
      const { id } = req.params;
      const rejected = await CarpoolRequestService.reject(id);
      if (!rejected) {
        return res.status(404).json({ message: 'Carpool request not found' });
      }
      return res.status(200).json(rejected);
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = carpoolRequestController;
