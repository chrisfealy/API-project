'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 3,
        address: '6040 FD Lane',
        city: 'Fourside',
        state: 'Eagleland',
        country: 'Special Stages',
        lat: 8.06,
        lng: 7.48,
        name: 'Final Destination',
        description: 'Counter-pick stage with no platforms.',
        price: 60.40
      },
      {
        ownerId: 2,
        address: '5050 BF Street',
        city: 'Fourside',
        state: 'Eagleland',
        country: 'Special Stages',
        lat: 6.84,
        lng: 7.52,
        name: 'Battlefield',
        description: 'Tri-platform starter stage.',
        price: 50.50
      },
      {
        ownerId: 1,
        address: `754 Randall Drive`,
        city: 'Island',
        state: 'Yoshi',
        country: `Yoshi's Island`,
        lat: 7.43,
        lng: 1.74,
        name: `Yoshi's Story`,
        description: 'Tri-platform starter stage, features Randall the moving cloud.',
        price: 75.4
      },
      {
        ownerId: 4,
        address: '100 Pokemon Stadium',
        city: 'Saffron City',
        state: 'Kanto',
        country: 'Kanto',
        lat: 10.07,
        lng: 4.53,
        name: 'Pokemon Stadium',
        description: "Starter stage with no top platform but two side platforms. Features transformations at some tournaments but remains frozen on Slippi.",
        price: 100
      },
      {
        ownerId: 5,
        address: '64 Dreamland Drive',
        city: 'Kirbyville',
        state: 'Ohio',
        country: 'Mangoland',
        lat: 9.44,
        lng: 7.45,
        name: 'Dreamland',
        description: 'Tri-platform starter stage with Whispy who occasionally blows wind affecting both players.',
        price: 64
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Final Destination', 'Battlefield', `Yoshi's Story`, 'Pokemon Stadium', 'Dreamland'] }
    }, {});
  }
};
