const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CarpoolRequest = sequelize.define('CarpoolRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  seatsNeeded: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'carpool_requests',
  timestamps: true,
  underscored: true,
});

module.exports = CarpoolRequest;
