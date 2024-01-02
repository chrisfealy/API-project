'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://pbs.twimg.com/ext_tw_video_thumb/1154127845012181005/pu/img/9TBAvSyLghBpcprm.jpg'
      },
      {
        reviewId: 2,
        url: 'https://pbs.twimg.com/media/CCeX8mmW8AAg1du.png'
      },
      {
        reviewId: 3,
        url: 'https://pm1.aminoapps.com/6066/510166f754e80f934139404fa1de5166b6ca29a7_00.jpg'
      },
      {
        reviewId: 4,
        url: 'https://ggn00b.com/wp-content/uploads/2020/09/Untitled-50.jpg'
      },
      {
        reviewId: 5,
        url: 'https://i.ytimg.com/vi/3NMhGCf20i0/maxresdefault.jpg'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
