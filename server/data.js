const games = [
  {
    name: 'Red Light, Green Light',
    img: '/images/redlight.png',
    desc: [
      'Red means stop. Green means go. But you gotta hurry before time runs out!',
    ],
    settings: [{ Time: 2 }, { Players: 2 }, { sound: 'on' }],
  },
  {
    name: 'The Floor is Lava',
    img: '/images/floorlava.png',
    desc: [
      'Only your furniture can save you from the hot, bubbling, molten lava!',
    ],
    id: 1,
  },
  {
    name: 'Musical Chairs',
    img: '/images/music.png',
    desc: ['Now is your chance to show off those sweet dance moves!'],
    id: 2,
  },
];

module.exports = { games };
