const Passenger = require('../models/passenger');

// Get all passengers
const getAllPassengers = async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.status(200).json(passengers);
  } catch (error) {
    console.error('Error fetching passengers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get passenger by ID
const getPassengerById = async (req, res) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findById(id);
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(200).json(passenger);
  } catch (error) {
    console.error(`Error fetching passenger ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new passenger
const createPassenger = async (req, res) => {
  try {
    const passenger = new Passenger(req.body);
    await passenger.save();
    res.status(201).json(passenger);
  } catch (error) {
    console.error('Error creating passenger:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update passenger
const updatePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(200).json(passenger);
  } catch (error) {
    console.error(`Error updating passenger ${id}:`, error);
    res.status(400).json({ message: error.message });
  }
};

// Delete passenger
const deletePassenger = async (req, res) => {
  const { id } = req.params;
  try {
    const passenger = await Passenger.findByIdAndDelete(id);
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting passenger ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllPassengers,
  getPassengerById,
  createPassenger,
  updatePassenger,
  deletePassenger,
};