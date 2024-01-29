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
        firstName: 'Mario',
        lastName: 'Mario',
        username: 'Mario',
        email: 'mario@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Luigi',
        lastName: 'Mario',
        username: 'Luigi',
        email: 'luigi@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yoshi',
        lastName: 'Munchakoopas',
        username: 'Yoshi',
        email: 'yoshi@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Donkey',
        lastName: 'Kong',
        username: 'Donkey Kong',
        email: 'dk@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Link',
        lastName: 'Link',
        username: 'Link',
        email: 'link@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Samus',
        lastName: 'Aran',
        username: 'Samus',
        email: 'samus@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kirby',
        lastName: 'Kirby',
        username: 'Kirby',
        email: 'kirby@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fox',
        lastName: 'McCloud',
        username: 'Fox',
        email: 'fox@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pikachu',
        lastName: 'Pikachu',
        username: 'Pikachu',
        email: 'pikachu@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jiggly',
        lastName: 'Puff',
        username: 'Jigglypuff',
        email: 'jigglypuff@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Douglas',
        lastName: 'Falcon',
        username: 'Captain Falcon',
        email: 'c.falcon@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ness',
        lastName: 'Ness',
        username: 'Ness',
        email: 'ness@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Peach',
        lastName: 'Toadstool',
        username: 'Peach',
        email: 'peach@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'King',
        lastName: 'Koopa',
        username: 'Bowser',
        email: 'bowser@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Doctor',
        lastName: 'Mario',
        username: 'Dr. Mario',
        email: 'dr.mario@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Zelda',
        lastName: 'Hyrule',
        username: 'Sheik',
        email: 'zeldasheik@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ganondorf',
        lastName: 'Dragmire',
        username: 'Ganondorf',
        email: 'ganondorf@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Young',
        lastName: 'Link',
        username: 'Young Link',
        email: 'younglink@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Falco',
        lastName: 'Lombardi',
        username: 'Falco',
        email: 'falco@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Mew',
        lastName: 'Two',
        username: 'Mewtwo',
        email: 'mewtwo@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pichu',
        lastName: 'Pichu',
        username: 'Pichu',
        email: 'pichu@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ice',
        lastName: 'Climbers',
        username: 'Ice Climbers',
        email: 'iceclimbers@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Marth',
        lastName: 'Lowell',
        username: 'Marth',
        email: 'marth@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Roy',
        lastName: 'Pharae',
        username: 'Roy',
        email: 'roy@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Game',
        lastName: 'Watch',
        username: 'Mr. Game & Watch',
        email: 'mrgnw@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Master',
        lastName: 'Hand',
        username: 'Master Hand',
        email: 'masterhand@melee.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'DemoUser',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Mario', 'Luigi', 'Yoshi', 'Donkey Kong', 'Link', 'Samus', 'Kirby', 'Fox', 'Pikachu', 'Jigglypuff', 'Captain Falcon', 'Ness', 'Peach', 'Bowser', 'Dr. Mario', 'Sheik', 'Ganondorf', 'Young Link', 'Falco', 'Mewtwo', 'Pichu', 'Ice Climbers', 'Marth', 'Roy', 'Mr. Game & Watch', 'Master Hand', 'DemoUser'] }
    }, {});
  }
};
