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
        spotId: 1,
        userId: 2,
        review: "I just get chaingrabbed by Marth players on this stage...",
        stars: 2,
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Randall giveth and Randall taketh away.',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Fox Up-Throw -> Up-Air KOs at 40%',
        stars: 1,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Pretty balanced/neutral stage, most people agree to start here.',
        stars: 4,
      },
      {
        spotId: 5,
        userId: 4,
        review: 'YO DID I JUST WALK UP SLOWLY, AND DOWNSMASH?!',
        stars: 4,
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [2, 5, 1, 4] }
    }, {});
  }
};
