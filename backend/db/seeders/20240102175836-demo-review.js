'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Review.bulkCreate([
      {
        spotId: 29,
        userId: 8,
        review: "I just get chaingrabbed by Marth players on this stage...",
        stars: 1,
      },
      {
        spotId: 4,
        userId: 19,
        review: 'Randall giveth and Randall taketh away.',
        stars: 5,
      },
      {
        spotId: 15,
        userId: 10,
        review: 'Fox Up-Throw -> Up-Air KOs at 40%',
        stars: 2,
      },
      {
        spotId: 28,
        userId: 23,
        review: 'Pretty balanced/neutral stage, most people agree to start here.',
        stars: 4,
      },
      {
        spotId: 25,
        userId: 11,
        review: 'YO DID I JUST WALK UP SLOWLY, AND DOWNSMASH?!',
        stars: 4,
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1, 5, 2, 4] }
    }, {});
  }
};
