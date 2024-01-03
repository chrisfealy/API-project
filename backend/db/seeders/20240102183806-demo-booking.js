'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Booking.bulkCreate([
      {
        spotId: 3,
        userId: 2,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-04")
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date("2023-03-22"),
        endDate: new Date("2023-03-26")
      },
      {
        spotId: 5,
        userId: 3,
        startDate: new Date("2023-07-23"),
        endDate: new Date("2023-07-31")
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [3, 4, 5] }
    }, {});
  }
};
