/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '.',
  'S': '🚧',
  'X': '🌲',
  'B':'💣',
  'I': '🎁',
  'H':'🧡',
  'PLAYER': '🚖',
  'COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
};

const maps = [];
maps.push(`
  I--XXXXXXX
  XX-XXXXXXX
  -X-XXXXXXX
  -X-XXXXXXX
  ---XXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  XX-----XXX
  X--XXX-XXX
  X-XXXX-XXX
  X---XX---X
  XXX-XXXX--
  ----XXXXX-
  -XXXXX--XI
  -X---X-XXX
  ---X-X---O
  XXXX---XXX
`);
maps.push(`
  XXXXXXXXXXXX
  X----------X
  X-XXXX-XXX-X
  X-X---X-IX-X
  X-X-X-X-XX-X
  X-X-X-X-XX-X
  X-X-X-X-XX-X
  X-X-X-X-XX-X
  X-X-X-X-XX-X
  X-X-X-X-X-OX
  X---X---X-XX
  XXXXXXXX--XX
`);
maps.push(`
  ------OX---XXX
  -XXXX-X--X-XXX
  X---X---XX-X-X
  X-X-XXXXXX---X
  X-X--X---X-X-X
  X-XX---X-X-X-X
  X---XXX--X-X-X
  X-X---X-XX-X--
  X-X-X-X-XX-XX-
  X-XXX-X--XX---
  XXX---XX--X-XX
  X---XXXXX-X---
  X-XX----X-XXX-
  X----XXIX-----
  `);

/* maps.push(`
  ---B---B---BX
  -B---B---B-OX
  --BBBBXXBBBBX
  B-BXXXB-----X
  B--BXB--BBB-X
  BB-BXXIBB---B
  B--BXXXXB-BBX
  --BXXBXBB--BX
  -BBBBBXXBB-BX
  --B---BB---BX
  B---B----BBBX
  XBXXXBXXXXXXX
`); */


