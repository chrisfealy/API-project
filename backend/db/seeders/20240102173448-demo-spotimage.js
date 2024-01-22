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
        url: 'https://www.ssbwiki.com/images/a/aa/CASTL-NRML1-SSBM.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.ssbwiki.com/images/2/2a/SSBU-Princess_Peach%27s_Castle.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://ssb.wiki.gallery/images/thumb/3/3a/RNBOW-NRML1-SSBM.png/798px-RNBOW-NRML1-SSBM.png?20150525185629',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://ssb.wiki.gallery/images/b/be/Rainbow_Cruise.jpg?20150216013429',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://ssb.wiki.gallery/images/thumb/8/84/SSBU-Rainbow_Cruise.png/800px-SSBU-Rainbow_Cruise.png?20180817215828',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://ssb.wiki.gallery/images/b/b5/Mushroom_Kingdom_I_Melee.png?20121125040439',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://ssb.wiki.gallery/images/1/1a/Yoshi%27sStory.PNG?20130727231426',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://ssb.wiki.gallery/images/thumb/0/0c/SSBU-Yoshi%27s_Story.png/800px-SSBU-Yoshi%27s_Story.png?20180817205213',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://ssb.wiki.gallery/images/thumb/1/1d/SSB4UYoshisIsland.png/800px-SSB4UYoshisIsland.png?20141122080003',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://ssb.wiki.gallery/images/thumb/9/9a/SSBU-Yoshi%27s_Island_%28SSBM%29.png/800px-SSBU-Yoshi%27s_Island_%28SSBM%29.png?20200315184432',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://ssb.wiki.gallery/images/d/d1/YoshisIslandSSBM.jpg?20101007204823',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://ssb.wiki.gallery/images/9/90/YoshiIslandMelee.jpg?20101007211131',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://ssb.wiki.gallery/images/thumb/3/36/KONGO-NRML-SSBM.jpg/798px-KONGO-NRML-SSBM.jpg?20150506005945',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://ssb.wiki.gallery/images/thumb/b/b4/SSBU-Kongo_Falls.jpg/800px-SSBU-Kongo_Falls.jpg?20180804044257',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://ssb.wiki.gallery/images/thumb/7/7f/JAPES-NRML-SSBM.png/798px-JAPES-NRML-SSBM.png?20150506003136',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://ssb.wiki.gallery/images/8/8b/JungleJapes.jpg?20101115224455',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://ssb.wiki.gallery/images/e/e8/JungleJapes3DS.png?20190330004408',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://ssb.wiki.gallery/images/thumb/4/4c/SSBU-Jungle_Japes.png/800px-SSBU-Jungle_Japes.png?20180817210304',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://ssb.wiki.gallery/images/thumb/8/80/GTBAY-NRML-SSBM.jpg/798px-GTBAY-NRML-SSBM.jpg?20150507193041',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://ssb.wiki.gallery/images/thumb/8/83/SSBU-Great_Bay.jpg/800px-SSBU-Great_Bay.jpg?20180818212924',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://ssb.wiki.gallery/images/b/b8/Hyrule_Temple_SSBM.png?20140121172545',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://ssb.wiki.gallery/images/b/bd/Hyrule_Temple.jpg?20140121213354',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://ssb.wiki.gallery/images/thumb/5/50/SSB4UTemple.png/800px-SSB4UTemple.png?20141122070922',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://ssb.wiki.gallery/images/thumb/3/3b/SSBU-Temple.png/800px-SSBU-Temple.png?20180810220325',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://ssb.wiki.gallery/images/thumb/e/e4/ZEBES-NRML-SSBM.jpg/798px-ZEBES-NRML-SSBM.jpg?20150506022531',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://ssb.wiki.gallery/images/3/3c/Brinstar_brawl.jpg?20101007205014',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://ssb.wiki.gallery/images/b/b3/SSB4_Brinstar.JPG?20141009025058',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://ssb.wiki.gallery/images/thumb/d/d1/SSBU-Brinstar.png/800px-SSBU-Brinstar.png?20180817211438',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://ssb.wiki.gallery/images/thumb/3/32/DREAM-NRML-SSBM.png/798px-DREAM-NRML-SSBM.png?20150505232819',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://ssb.wiki.gallery/images/thumb/c/c3/SSBU-Fountain_of_Dreams.png/800px-SSBU-Fountain_of_Dreams.png?20180810230829',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://ssb.wiki.gallery/images/thumb/6/60/GREEN-NRML-SSBM.png/798px-GREEN-NRML-SSBM.png?20150505232852',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://ssb.wiki.gallery/images/thumb/5/5a/SSBU-Green_Greens.png/800px-SSBU-Green_Greens.png?20200315194627',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://ssb.wiki.gallery/images/thumb/9/95/STRFX-NRML-SSBM.jpg/798px-STRFX-NRML-SSBM.jpg?20150506052300',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://ssb.wiki.gallery/images/thumb/0/01/SSBU-Corneria.png/800px-SSBU-Corneria.png?20180818205922',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://ssb.wiki.gallery/images/thumb/e/e6/VENOM-NRML1-SSBM.png/798px-VENOM-NRML1-SSBM.png?20150506052511',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://ssb.wiki.gallery/images/8/8d/SSBU-Venom.png?20180808171814',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://ssb.wiki.gallery/images/thumb/8/8a/PSTAD-NRML1-SSBM.png/798px-PSTAD-NRML1-SSBM.png?20150505225747',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://ssb.wiki.gallery/images/thumb/7/73/SSBU-Pok%C3%A9mon_Stadium.png/800px-SSBU-Pok%C3%A9mon_Stadium.png?20180817211328',
        preview: false
      },
      {
        spotId: 16,
        url: 'https://ssb.wiki.gallery/images/9/9a/MuteCity.jpg?20150216012014',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://ssb.wiki.gallery/images/thumb/6/66/ONETT-NRML-SSBM.jpg/798px-ONETT-NRML-SSBM.jpg?20150505232922',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://ssb.wiki.gallery/images/thumb/e/ea/SSB4UOnett.jpg/800px-SSB4UOnett.jpg?20200529140417',
        preview: false
      },
      {
        spotId: 17,
        url: 'https://ssb.wiki.gallery/images/thumb/6/68/SSBU-Onett.png/800px-SSBU-Onett.png?20180919180732',
        preview: false
      },
      {
        spotId: 18,
        url: 'https://ssb.wiki.gallery/images/f/f3/IcicleMountain.jpg?20150216013700',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://ssb.wiki.gallery/images/thumb/e/e7/MKII-NRML-SSBM.png/798px-MKII-NRML-SSBM.png?20150507193632',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://ssb.wiki.gallery/images/thumb/9/92/SSBU-Mushroom_Kingdom_II.png/800px-SSBU-Mushroom_Kingdom_II.png?20180817210735',
        preview: false
      },
      {
        spotId: 20,
        url: 'https://ssb.wiki.gallery/images/e/e2/Yoshi%27s_Island_Melee.png?20121125043428',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://ssb.wiki.gallery/images/thumb/8/80/SSBU-Yoshi%27s_Island_%28SSB%29.png/800px-SSBU-Yoshi%27s_Island_%28SSB%29.png?20180810231238',
        preview: false
      },
      {
        spotId: 21,
        url: 'https://ssb.wiki.gallery/images/thumb/5/5e/OLDKJ-NRML-SSBM.png/798px-OLDKJ-NRML-SSBM.png?20150506003207',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://ssb.wiki.gallery/images/thumb/7/73/SSBU-Kongo_Jungle.png/800px-SSBU-Kongo_Jungle.png?20180817205511',
        preview:false
      },
      {
        spotId: 22,
        url: 'https://ssb.wiki.gallery/images/a/a1/Brinstardepths.jpg?20120829204751',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://ssb.wiki.gallery/images/thumb/b/b3/SSBU-Brinstar_Depths.png/800px-SSBU-Brinstar_Depths.png?20200316075508',
        preview: false
      },
      {
        spotId: 23,
        url: 'https://ssb.wiki.gallery/images/thumb/2/28/OLDDL-NRML-SSBM.jpg/798px-OLDDL-NRML-SSBM.jpg?20150506003228',
        preview: true
      },
      {
        spotId: 23,
        url: 'https://ssb.wiki.gallery/images/thumb/6/68/SSBU-Dream_Land.png/800px-SSBU-Dream_Land.png?20180817205401',
        preview: false
      },
      {
        spotId: 24,
        url: 'https://ssb.wiki.gallery/images/8/8e/PokeFloats.jpg?20150216010856',
        preview: true
      },
      {
        spotId: 25,
        url: 'https://ssb.wiki.gallery/images/thumb/4/43/BBLUE-NRML-SSBM.jpg/798px-BBLUE-NRML-SSBM.jpg?20150512135125',
        preview: true
      },
      {
        spotId: 25,
        url: 'https://ssb.wiki.gallery/images/thumb/6/61/SSBU-Big_Blue.png/800px-SSBU-Big_Blue.png?20200315201450',
        preview: false
      },
      {
        spotId: 26,
        url: 'https://ssb.wiki.gallery/images/6/66/Fourside_Melee.png?20200510020034',
        preview: true
      },
      {
        spotId: 26,
        url: 'https://ssb.wiki.gallery/images/thumb/3/39/SSBU-Fourside.jpg/800px-SSBU-Fourside.jpg?20200315201544',
        preview: false
      },
      {
        spotId: 27,
        url: 'https://ssb.wiki.gallery/images/d/d0/Flatzone_copy.jpg?20111202203812',
        preview: true
      },
      {
        spotId: 28,
        url: 'https://ssb.wiki.gallery/images/d/de/Battlefieldssbm.jpg?20130713145333',
        preview: true
      },
      {
        spotId: 28,
        url: 'https://ssb.wiki.gallery/images/e/e0/Battlefield_Brawl.png?20180930155317',
        preview: false
      },
      {
        spotId: 28,
        url: 'https://ssb.wiki.gallery/images/thumb/8/8d/BattlefieldDayNightCycle1WiiUSSB4.png/800px-BattlefieldDayNightCycle1WiiUSSB4.png?20130613235635',
        preview: false
      },
      {
        spotId: 28,
        url: 'https://ssb.wiki.gallery/images/thumb/8/86/SSBU-Battlefield.png/800px-SSBU-Battlefield.png?20180819030119',
        preview: false
      },
      {
        spotId: 28,
        url: 'https://ssb.wiki.gallery/images/thumb/5/58/Battlefield_64.png/300px-Battlefield_64.png',
        preview: false
      },
      {
        spotId: 29,
        url: 'https://ssb.wiki.gallery/images/0/03/Final_Destination_Melee.png?20211104080445',
        preview: true
      },
      {
        spotId: 29,
        url: 'https://ssb.wiki.gallery/images/0/0b/Final_Destination_Brawl.JPG?20140121220800',
        preview: false
      },
      {
        spotId: 29,
        url: 'https://ssb.wiki.gallery/images/thumb/7/77/SSB4_WII_U_Final-Destination.jpg/800px-SSB4_WII_U_Final-Destination.jpg?20140409042400',
        preview: false
      },
      {
        spotId: 29,
        url: 'https://ssb.wiki.gallery/images/thumb/9/91/SSBU-Final_Destination.jpg/800px-SSBU-Final_Destination.jpg?20180919181031',
        preview: false
      },
      {
        spotId: 29,
        url: 'https://ssb.wiki.gallery/images/b/b7/FinalDestinationSSB.png?20120114210336',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] }
    }, {});
  }
};
