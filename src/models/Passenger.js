'use strict';

module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define('Passenger', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [7, 20],
      },
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: 'passengers',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  });

  Passenger.associate = function(models) {
    // Define associations here if needed, e.g.,
    // Passenger.hasMany(models.Booking, { foreignKey: 'passenger_id' });
  };

  return Passenger;
};