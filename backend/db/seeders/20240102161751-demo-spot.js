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
        description: `Final Destination is a flat, medium sized stage, very similar to its Smash 64 counterpart but much larger. It features a single, octagonal solid platform, under which a black orb floats. While having no effect on gameplay, the background of the stage changes during matches; a full cycle lasts about 216 seconds.`,
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
        description: `Battlefield's main platform is flat, just like Final Destination, but not as long. Three smaller platforms are suspended in a pyramid pattern above the main platform. It shares cosmetic similarities to Final Destination in that the background is abstract and changes shape and color constantly.`,
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
        description: `Yoshi's Story is a very basic, neutral stage, with a layout similar in structure to Battlefield. The main platform is primarily flat then slightly slopes downwards at the edges to the left and right. The stage also features a small floating cloud, colloquially dubbed "Randall" (see below). Additionally, there are Shy Guys which fly around in groups of 1-6 in a line.`,
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
        description: `The basic stage is symmetrical and consists of one large main platform, with two floating soft platforms above. After a varying period of time, the basic stage transforms into a random one of four variants, each based on a type from the Pokémon series.`,
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
        description: 'The stage features three static floating platforms above a main one with Whispy Woods, a recurring boss in the Kirby series in the middle of the stage, facing left.',
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
