'use strict';

class CarOwner {
  constructor({ id = null, name, email, phone, cars = [] } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cars = cars;
    this._validate();
  }

  _validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('Invalid name');
    }
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error('Invalid email');
    }
    if (!this.phone || !/^\+?\d{7,15}$/.test(this.phone)) {
      throw new Error('Invalid phone number');
    }
    if (!Array.isArray(this.cars)) {
      throw new Error('Cars must be an array');
    }
  }

  addCar(car) {
    this.cars.push(car);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      cars: this.cars
    };
  }
}

module.exports = CarOwner;
