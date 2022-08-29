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
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
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
  XXX----XXX
  XXX-XX--OX
  XXX-XX-XXX
  XXX-XX-XXX
  XXX-XX-XXX
  ----XX-XXX
  -XXXXX-XXX
  -X-----XXX
  -IXXXX-XXX
  XX-----XXX
`);
/* maps.push(`
  XB-----BXX
  X--BXB-BXX
  X-BXXX-XXX
  X-XXXB---B
  X-B---XB--
  ----XXXXB-
  -BXXXX--XI
  -------BXX
  XBXXXB---O
  XX-----XXX
`); */
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


