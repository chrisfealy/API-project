'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        id: 1,
        firstName: 'Falco',
        lastName: 'Lombardi',
        username: 'Falco',
        email: 'falco@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        firstName: 'Fox',
        lastName: 'McCloud',
        username: 'Fox',
        email: 'fox@melee.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        firstName: 'Marth',
        lastName: 'Lowell',
        username: 'Marth',
        email: 'marth@melee.com',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,
        firstName: 'Captain',
        lastName: 'Falcon',
        username: 'C.Falcon',
        email: 'cfalcon@melee.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        id: 5,
        firstName: 'Jiggly',
        lastName: 'Puff',
        username: 'Jigglypuff',
        email: 'puff@melee.com',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Falco', 'Fox', 'Marth', 'C.Falcon', 'Jigglypuff'] }
    }, {});
  }
};
