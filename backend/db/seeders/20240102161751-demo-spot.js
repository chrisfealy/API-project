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
        ownerId: 13,
        address: "1 Royal Lane",
        city: "Mushroom Kingdoom",
        state: "Mushroom Kingdoom",
        country: "Mario Universe",
        lat: -34.9630823,
        lng: 99.4821467,
        name: "Princess Peach's Castle",
        description: "Announced at E3 2001, Princess Peach's Castle (ピーチ城, Peach Castle) is a stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. It is the roof of the castle as seen in Super Mario 64. In Melee's All-Star Mode, this stage is played on when the player faces Peach and any of her teammates. In Melee, Dr. Mario is fought here for his unlock battle, while in Ultimate, Peach is fought here for her unlock battle.",
        price: 146.64
      },
      {
        ownerId: 1,
        address: "7 Skyport Plaza",
        city: "Cloud Kingdom",
        state: "Mushroom Kingdoom",
        country: "Mario Universe",
        lat: 48.9914043,
        lng: -21.0030998,
        name: "Rainbow Cruise",
        description: "Rainbow Cruise (レインボークルーズ, Rainbow Cruise), also known as Rainbow Ride, is a stage that appears in Super Smash Bros. Melee, Super Smash Bros. Brawl, and Super Smash Bros. Ultimate. It is based off the \"Rainbow Ride\" stage from Super Mario 64. It is also one of Mario's home stages, and it is his stage in All-Star Mode, along with any of his teammates, as well as Bowser's stage in All-Star Match 1 of Melee's Event Match.",
        price: 131.13
      },
      {
        ownerId: 1,
        address: "23 Toadstool Street",
        city: "Fungi District",
        state: "Mushroom Kingdoom",
        country: "Mario Universe",
        lat: 66.2482936,
        lng: -150.4623994,
        name: "Mushroom Kingdoom",
        description: "Mushroom Kingdom (いにしえの王国, Ancient Kingdom) is a starter stage in Super Smash Bros. Melee. It is Luigi and Dr. Mario's home stage. In All-Star mode, this stage is played on when Luigi and any of his teammates are faced.",
        price: 108.94
      },
      {
        ownerId: 3,
        address: "42 Eggshell Avenue",
        city: "Yoshi's Island",
        state: "Yoshi's Island",
        country: "Yoshi Universe",
        lat: -60.8564632,
        lng: -177.5475602,
        name: "Yoshi's Story",
        description: "Announced at E3 2001, Yoshi's Story (ヨッシーストーリー, Yoshi Story) is a stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. It is one of Yoshi's home stages, and in Melee, he is faced here in All-Star Mode.",
        price: 93.12
      },
      {
        ownerId: 3,
        address: "9 Dino Park Drive",
        city: "Dinosaur Valley",
        state: "Yoshi's Island",
        country: "Yoshi Universe",
        lat: -50.2030087,
        lng: 61.0547072,
        name: "Yoshi's Island",
        description: "Announced at E3 2001, Yoshi's Island (ヨースター島, Yoster Island) is a starter stage in Super Smash Bros. Melee, also available as a Melee Stage in Super Smash Bros. Brawl and a Familiar Stage in Super Smash Bros. for Wii U and Super Smash Bros. Ultimate.",
        price: 83.77
      },
      {
        ownerId: 4,
        address: "15 Jungle Cascade",
        city: "Kongo Jungle",
        state: "DK Island",
        country: "DK Universe",
        lat: 47.5438240,
        lng: 124.3921420,
        name: "Kongo Falls",
        description: "Kongo Falls (いかだと滝, Raft and Waterfall), previously referred to as Kongo Jungle (コンゴジャングル, Kongo Jungle), is one of three Donkey Kong stages in Super Smash Bros. Melee. This stage is played in All-Star Mode when the player faces Donkey Kong and any of his teammates. It returns in Super Smash Bros. Ultimate with numerous aesthetic updates. In Ultimate, Diddy Kong is fought here for his unlock battle.",
        price: 140.89
      },
      {
        ownerId: 4,
        address: "30 Vine Way",
        city: "Banana Grove",
        state: "DK Island",
        country: "DK Universe",
        lat: 46.0280503,
        lng: -143.7058764,
        name: "Jungle Japes",
        description: "Jungle Japes (ジャングルガーデン, Jungle Garden) is a starter stage in Super Smash Bros. Melee, unlockable as a Melee Stage in Super Smash Bros. Brawl, and reappears as a Familiar Stage in Super Smash Bros. for Nintendo 3DS and Super Smash Bros. Ultimate. In Melee, Young Link and his teammates are fought here in All-Star Mode, while Ultimate, King K. Rool is fought here for his unlock battle.",
        price: 132.85
      },
      {
        ownerId: 5,
        address: "5 Tidal Reef Terrace",
        city: "Zora Harbor",
        state: "Termina",
        country: "The Legend of Zelda",
        lat: -8.6879244,
        lng: -179.8274540,
        name: "Great Bay",
        description: "Great Bay (グレートベイ, Great Bay) is a stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. It could be considered Young Link's home stage, as he is the main character in The Legend of Zelda: Majora's Mask, from which this stage originates. He is fought here when being unlocked.",
        price: 133.35
      },
      {
        ownerId: 16,
        address: "10 Ancient Ruins Road",
        city: "Hyrule",
        state: "Hyrule",
        country: "The Legend of Zelda",
        lat: -62.7344242,
        lng: -129.7257906,
        name: "Temple",
        description: "Temple (神殿, Temple) is a stage introduced in Super Smash Bros. Melee, which returns in Super Smash Bros. Brawl as a Melee Stage, and in Super Smash Bros. for Wii U and Super Smash Bros. Ultimate as a familiar stage. It is commonly known as Hyrule Temple (this name appears in Melee's instruction booklet at page 49), though its proper name is Temple (since \"Hyrule\" denotes Temple's location). Temple was first announced at E3 2001. In Melee, Roy is fought here for his unlocking battle, while in Ultimate, Zelda is fought here for her unlocking battle.",
        price: 143.16
      },
      {
        ownerId: 6,
        address: "8 Biozone Avenue",
        city: "Zebes",
        state: "Planet Zebes",
        country: "Metroid",
        lat: 37.1372049,
        lng: -163.9087870,
        name: "Brinstar",
        description: "Brinstar (ブリンスタ, Brinstar) is the default Metroid stage that appears in Super Smash Bros. Melee, Super Smash Bros. Brawl, Super Smash Bros. for Nintendo 3DS, and Super Smash Bros. Ultimate. It is a redesigned version of Planet Zebes from the original Super Smash Bros. In Ultimate, Zero Suit Samus is fought here for her unlock battle.",
        price: 100.89
      },
      {
        ownerId: 7,
        address: "3 Dream Fountain Plaza",
        city: "Dream City",
        state: "Dream Land",
        country: "Kirby Universe",
        lat: 82.6244308,
        lng: 16.2242777,
        name: "Fountain of Dreams",
        description: "Announced in the E3 2001 trailer, Fountain of Dreams (夢の泉, Fountain of Dreams) is a starter stage in Super Smash Bros. Melee which returns in Super Smash Bros. Ultimate. In Melee's All-Star Mode or when in his unlock battle, this stage is played on when the player faces Marth and any of his teammates. Unusually, in Classic Mode, Bowser is fought on this stage during the giant battle, despite this being Kirby's stage and the abundance of Mario stages. In Ultimate, King Dedede is fought here for his unlocking battle.",
        price: 82.84
      },
      {
        ownerId: 7,
        address: "25 Verdant Fields",
        city: "Dream City",
        state: "Dream Land",
        country: "Kirby Universe",
        lat: 47.4229650,
        lng: 31.9848584,
        name: "Green Greens",
        description: "Green Greens (グリーングリーンズ, Green Greens) is a starting stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate, and an unlockable stage in Super Smash Bros. Brawl. It is also Kirby's home stage, and where the player faces him and his teammates in All-Star mode on this stage.",
        price: 86.06
      },
      {
        ownerId: 8,
        address: "18 Starship Street",
        city: "Lylat",
        state: "Lylat System",
        country: "Star Fox Universe",
        lat: -43.7160679,
        lng: 124.9622300,
        name: "Corneria",
        description: "Announced at E3 2001, Corneria (惑星コーネリア, Planet Corneria) is a starter stage in Super Smash Bros. Melee, and is essentially a smaller version of Fox's old stage, Sector Z, which was in Super Smash Bros. Corneria later appeared in Super Smash Bros. Brawl as a Melee stage and in Super Smash Bros. for Nintendo 3DS as a familiar stage. In All-Star Mode in Melee, this stage is where one fights Fox and any of his teammates. This stage returns once again in Super Smash Bros. Ultimate, although updated to resemble the stage's appearance in Star Fox Zero. In Smash 3DS and Ultimate, Falco is fought here when being unlocked.",
        price: 116.54
      },
      {
        ownerId: 8,
        address: "4 Starfox Avenue",
        city: "Lylat",
        state: "Lylat System",
        country: "Star Fox Universe",
        lat: -18.8362317,
        lng: -24.4844874,
        name: "Venom",
        description: "Venom (惑星ベノム, Planet Venom) is a starter stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. In All-Star Mode, this is where Falco and his teammates are fought.",
        price: 52.16
      },
      {
        ownerId: 9,
        address: "16 Pokeball Parkway",
        city: "Pokeville",
        state: "Kanto",
        country: "Pokemon Universe",
        lat: -40.5947842,
        lng: -174.5324302,
        name: "Pokemon Stadium",
        description: "Announced at E3 2001, Pokémon Stadium (ポケモンスタジアム, Pokémon Stadium), is a stage debuting in Super Smash Bros. Melee and returning in both Super Smash Bros. Brawl and Super Smash Bros. Ultimate. It is commonly referred to as \"Pokémon Stadium 1\" to avoid confusion with its similar successor, Pokémon Stadium 2.",
        price: 113.54
      },
      {
        ownerId: 11,
        address: "22 F-Zero Freeway",
        city: "Mute City",
        state: "F-Zero Grand Prix",
        country: "F-Zero Universe",
        lat: -50.7949286,
        lng: -58.2184257,
        name: "Mute City",
        description: "Mute City (ミュートシティ, Mute City) is a stage in Super Smash Bros. Melee that is available from the start. It is Captain Falcon's home stage, and he is faced here in All-Star mode.",
        price: 107.60
      },
      {
        ownerId: 12,
        address: "11 Eagleland Lane",
        city: "Eagleland",
        state: "Eagleland",
        country: "Earthbound",
        lat: 4.9021690,
        lng: 36.2390709,
        name: "Onett",
        description: "Announced at E3 2001, Onett (オネット, Onett) is a stage available in Super Smash Bros. Melee, Super Smash Bros. Brawl, Super Smash Bros. for Wii U and Super Smash Bros. Ultimate. It is one of Ness's home stages in Melee, and also Lucas's from Brawl onwards. In All-Star Mode in Super Smash Bros. Melee, this stage is played on when the player face Ness and any of his teammates. In both Brawl and Ultimate, Ness is fought here for his unlocking battle.",
        price: 116.64
      },
      {
        ownerId: 22,
        address: "14 Frosty Peak Road",
        city: "Iceberg Heights",
        state: "Infinite Glacier",
        country: "Ice Climber Universe",
        lat: -22.2713770,
        lng: -38.1090850,
        name: "Icicle Mountain",
        description: "Icicle Mountain (アイシクルマウンテン, Icicle Mountain) is a stage in Super Smash Bros. Melee. In Adventure Mode, the mountain path is dominated by Freezie-pushing Topis and Polar Bears that force the stage to \"jump\" upward when they hop. Players can jump along the top of the stage to force their way higher to quickly face-off against the Ice Climber team, or climb still higher to reach the two-platform summit.",
        price: 128.51
      },
      {
        ownerId: 1,
        address: "2 Toadstool Terrace",
        city: "Fungi District",
        state: "Mushroom Kingdom",
        country: "Mario Universe",
        lat: 32.5972262,
        lng: 39.4527147,
        name: "Mushroom Kingdom II",
        description: "Mushroom Kingdom II (いにしえの王国II, Ancient Kingdom II) is an unlockable stage in Super Smash Bros. Melee and a starter stage in Super Smash Bros. Ultimate; in Ultimate, its Japanese name has been changed to いにしえの王国 USA (Ancient Kingdom USA), to better reflect the Japanese title of Super Mario Bros. 2, Super Mario USA.",
        price: 55.45
      },
      {
        ownerId: 3,
        address: "6 Joyful Grove Lane",
        city: "Happyland",
        state: "Yoshi's Island",
        country: "Yoshi Universe",
        lat: -80.9803923,
        lng: -57.9250772,
        name: "Super Happy Tree",
        description: "Super Happy Tree (スーパーしあわせのツリー, Super Happy Tree), referred to as Yoshi's Island (ヨッシーアイランド, Yoshi Island) prior to Super Smash Bros. Ultimate, is a stage in Super Smash Bros., Super Smash Bros. Melee, and Super Smash Bros. Ultimate.",
        price: 61.39
      },
      {
        ownerId: 4,
        address: "12 Primate Haven",
        city: "Kong Isle",
        state: "Kongo Jungle",
        country: "DK Universe",
        lat: 55.8141232,
        lng: 28.5119194,
        name: "Kongo Jungle",
        description: "Kongo Jungle (コンゴジャングル, Kongo Jungle) is a stage in Super Smash Bros. (originally spelled Congo Jungle) that reappears in Super Smash Bros. Melee (as Past Stages: Kongo Jungle on the stage select screen and as Kongo Jungle N64 in Random Stage switch), Super Smash Bros. for Wii U (as Kongo Jungle 64 in NTSC versions and Kongo Jungle (64) in PAL versions), and Super Smash Bros. Ultimate. It is one of Donkey Kong's home stages.",
        price: 61.68
      },
      {
        ownerId: 6,
        address: "21 Subterranean Cavern Way",
        city: "Zebes",
        state: "Planet Zebes",
        country: "Metroid",
        lat: 47.2725455,
        lng: 162.8878676,
        name: "Brinstar Depths",
        description: "Brinstar Depths (ブリンスタ深部, Brinstar Depths) is a stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. In Melee, it can be unlocked by playing 50 battles in Versus Mode. It is also one of Samus's home stages, but the player plays against Ganondorf and his teammates on this stage in All-Star Mode.",
        price: 104.41
      },
      {
        ownerId: 7,
        address: "19 Whispy Woods Walk",
        city: "Dream City",
        state: "Dream Land",
        country: "Kirby Universe",
        lat: 77.0928548,
        lng: 63.4651754,
        name: "Dream Land",
        description: "Dream Land (プププランド, Pupupu Land) is a stage that debuted in the original Super Smash Bros. It returns in Super Smash Bros. Melee with the name Past Stages: Dream Land and is unlocked by beating Target Test with every character. It is also available as downloadable content in both versions of Super Smash Bros. 4 on June 14th, 2015, and in the base game of Super Smash Bros. Ultimate. In those games, as with other returning stages from the first Smash Bros. game, some of the textures are slightly higher in quality, but the general overall primitive look of the original is retained.",
        price: 142.02
      },
      {
        ownerId: 10,
        address: "13 Floating Pokémon Parade",
        city: "Pokeville",
        state: "Kanto Skies",
        country: "Pokemon Universe",
        lat: -40.6109128,
        lng: 171.5420058,
        name: "Poke Floats",
        description: "Poké Floats is a stage in Super Smash Bros. Melee. In All-Star mode, Jigglypuff and its teammates are fought here. The Sudowoodo trophy is unlocked alongside this stage.",
        price: 90.92
      },
      {
        ownerId: 11,
        address: "17 F-Zero Freeway",
        city: "Mute City",
        state: "F-Zero Grand Prix",
        country: "F-Zero Universe",
        lat: 15.6635946,
        lng: -113.1590623,
        name: "Big Blue",
        description: "Big Blue (ビッグブルー, Big Blue) is a stage from the F-Zero franchise appearing in Super Smash Bros. Melee, Super Smash Bros. Brawl and Super Smash Bros. Ultimate.",
        price: 119.13
      },
      {
        ownerId: 12,
        address: "28 Urban Skyscraper Street",
        city: "Eagleland",
        state: "Eagleland",
        country: "Earthbound",
        lat: -38.3178132,
        lng: -42.1025537,
        name: "Fourside",
        description: "Fourside (フォーサイド, Fourside) is a stage in Super Smash Bros. Melee and Super Smash Bros. Ultimate. In Melee, it is an unlockable stage, while in Ultimate, it (along with all other non-DLC stages) appears as a starter stage. It is one of Ness's home stages, but Pichu and its teammates are faced here in All-Star Mode.",
        price: 126.28
      },
      {
        ownerId: 25,
        address: "20 2D Dimension Drive",
        city: "Game World",
        state: "Superflat World",
        country: "Game & Watch Universe",
        lat: 34.5589389,
        lng: 159.9614785,
        name: "Flat Zone",
        description: "Flat Zone (フラットゾーン, Flat Zone) is an unlockable stage in Super Smash Bros. Melee, and the home stage of Mr. Game & Watch. Flat Zone is unlocked when the player completes Classic Mode with Mr. Game & Watch. In All-Star mode, Flat Zone appears as the last stage where the player faces 25 lighter Mr. Game & Watches. Two event matches in Melee involve fighting on this stage. Mr. Game & Watch's Target Test also takes place on a modified version of this stage.",
        price: 137.37
      },
      {
        ownerId: 26,
        address: "24 Warzone Plaza",
        city: "Battle Arena",
        state: "Special Stages",
        country: "Super Smash Bros Universe",
        lat: 51.3610457,
        lng: 14.0648890,
        name: "Battlefield",
        description: "Battlefield (戦場, Battlefield) is a special stage in Super Smash Bros. Melee. In Classic Mode, the player may be able to fight Bowser on this stage before the metal fight; his possible allies in the team battle while being fought on this stage include Zelda, Mewtwo, Peach, and Mario.",
        price: 126.63
      },
      {
        ownerId: 26,
        address: "27 Ultimate Nexus Avenue",
        city: "The Void",
        state: "Special Stages",
        country: "Super Smash Bros Universe",
        lat: 62.7749735,
        lng: -174.8722426,
        name: "Final Destination",
        description: "Final Destination (終点, Endpoint), often abbreviated as FD, is a stage in Super Smash Bros. Melee. Master Hand and Crazy Hand are fought on this stage in Classic Mode, as well as Bowser and Giga Bowser in Adventure Mode, Roy and any of his teammates in All-Star Mode, and Ganondorf and Mewtwo in their unlock battles. Some event matches, including two All-Star Matches, are also played here.",
        price: 148.52
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Princess Peach's Castle", "Rainbow Cruise", "Mushroom Kingdoom", "Yoshi's Story", "Yoshi's Island", "Kongo Falls", "Jungle Japes", "Great Bay", "Temple", "Brinstar", "Fountain of Dreams", "Green Greens", "Corneria", "Venom", "Pokémon Stadium", "Mute City", "Onett", "Icicle Mountain", "Mushroom Kingdom II", "Super Happy Tree", "Kongo Jungle", "Brinstar Depths", "Dream Land", "Poke Floats", "Big Blue", "Fourside", "Flat Zone", "Battlefield", "Final Destination"] }
    }, {});
  }
};
