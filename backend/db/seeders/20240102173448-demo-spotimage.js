'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.ssbwiki.com/images/0/03/Final_Destination_Melee.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.ssbwiki.com/images/d/de/Battlefieldssbm.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.ssbwiki.com/images/1/1a/Yoshi%27sStory.PNG',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.ssbwiki.com/images/8/8a/PSTAD-NRML1-SSBM.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.ssbwiki.com/images/2/28/OLDDL-NRML-SSBM.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
