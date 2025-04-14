import type PieceType from '$lib/shogi/types/PieceType';

const F_POINTS_UP = [
  '49.5,6',
  '78.86,15.54',
  '92.55,102',
  '6.45,102',
  '20.14,15.44'
].join(' ');

const F_POINTS_DOWN = [
  '49.5,102',
  '78.86,92.46',
  '92.55,6',
  '6.45,6',
  '20.14,92.46'
].join(' ');

const E_POINTS_UP = [
  '49.5,7.5',
  '77.76,16.7',
  '91.05,100.5',
  '7.95,100.5',
  '21.24,16.7'
].join(' ');

const E_POINTS_DOWN = [
  '49.5,100.5',
  '77.76,91.3',
  '91.05,7.5',
  '7.95,7.5',
  '21.24,91.3'
].join(' ');

const D_POINTS_UP = [
  '49.5,9',
  '76.70,17.84',
  '89.55,99',
  '9.45,99',
  '22.30,17.84'
].join(' ');

const D_POINTS_DOWN = [
  '49.5,99',
  '76.70,90.16',
  '89.55,9',
  '9.45,9',
  '22.30,90.16'
].join(' ');

const C_POINTS_UP = [
  '49.5,10.5',
  '75.30,19.34',
  '87.75,97.5',
  '11.25,97.5',
  '23.70,19.34'
].join(' ');

const C_POINTS_DOWN = [
  '49.5,97.5',
  '75.30,88.66',
  '87.75,10.5',
  '11.25,10.5',
  '23.70,88.66'
].join(' ');

const B_POINTS_UP = [
  '49.5,12',
  '72.56,19.52',
  '84.75,96',
  '14.25,96',
  '26.44,19.52'
].join(' ');

const B_POINTS_DOWN = [
  '49.5,96',
  '72.56,88.48',
  '84.75,12',
  '14.25,12',
  '26.44,88.48'
].join(' ');

const A_POINTS_UP = [
  '49.5,13.5',
  '71.56,20.66',
  '83.25,94.5',
  '15.75,94.5',
  '27.44,20.66'
].join(' ');

const A_POINTS_DOWN = [
  '49.5,94.5',
  '71.56,87.34',
  '83.25,13.5',
  '15.75,13.5',
  '27.44,87.34'
].join(' ');

const PIECE_POINTS_UP = {
  "oushou": F_POINTS_UP,
  "gyokushou": F_POINTS_UP,
  "hisha": E_POINTS_UP,
  "kakugyou": E_POINTS_UP,
  "ryuuou": E_POINTS_UP,
  "ryuuma": E_POINTS_UP,
  "ginshou": D_POINTS_UP,
  "kinshou": D_POINTS_UP,
  "narigin": D_POINTS_UP,
  "keima": C_POINTS_UP,
  "narikei": C_POINTS_UP,
  "kyousha": B_POINTS_UP,
  "narikyou": B_POINTS_UP,
  "fuhyou": A_POINTS_UP,
  "tokin": A_POINTS_UP
};

const PIECE_POINTS_DOWN = {
  "oushou": F_POINTS_DOWN,
  "gyokushou": F_POINTS_DOWN,
  "hisha": E_POINTS_DOWN,
  "kakugyou": E_POINTS_DOWN,
  "ryuuou": E_POINTS_DOWN,
  "ryuuma": E_POINTS_DOWN,
  "ginshou": D_POINTS_DOWN,
  "kinshou": D_POINTS_DOWN,
  "narigin": D_POINTS_DOWN,
  "keima": C_POINTS_DOWN,
  "narikei": C_POINTS_DOWN,
  "kyousha": B_POINTS_DOWN,
  "narikyou": B_POINTS_DOWN,
  "fuhyou": A_POINTS_DOWN,
  "tokin": A_POINTS_DOWN
};

function calculatePointsString(pieceType: PieceType, playerNumber: number, pov: number): string {
  if (playerNumber === pov) {
    return PIECE_POINTS_UP[pieceType];
  } else {
    return PIECE_POINTS_DOWN[pieceType];
  }
};

export default calculatePointsString 
