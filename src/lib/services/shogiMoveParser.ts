import type GameState from '$lib/shogi/interfaces/GameState';
import type Square from '$lib/shogi/interfaces/Square';
import type Point from '$lib/shogi/interfaces/Point';

import exists from '$lib/utils/exists';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const FILE_TO_X = {
  '1': 8,
  '2': 7,
  '3': 6,
  '4': 5,
  '5': 4,
  '6': 3,
  '7': 2,
  '8': 1,
  '9': 0
};

const RANK_TO_Y = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8
};

const PIECE_MAP = {
  'P': 'fuhyou',
  'L': 'kyousha',
  'N': 'keima',
  'S': 'ginshou',
  'G': 'kinshou',
  'R': 'hisha',
  'B': 'kakugyou',
  '+P': 'tokin',
  '+L': 'narikyou',
  '+N': 'narikei',
  '+S': 'narigin',
  '+R': 'ryuuou',
  '+B': 'ryuuma'
};

const MIN = 0;
const MAX = 8;

// Reference:
//   x for capture e.g. Bxe5
//   disambiguation priority:
//      file of departure e.g. Rdf8
//      rank of departure e.g. R1a3
//      file and rank of departure. e.g. Qh4e1
//   drop *
//   promotion declined =
//   promotion accepted +

interface MoveComponents {
  movingPiece: string | undefined;
  fromId: string | undefined;
  moveType: string | undefined;
  toFile: string | undefined;
  toRank: string | undefined;
  promotion: string | undefined;
}

interface Move {
  kind: string,
  fromId: string | null,
  pieceId: number | null,
  toId: string,
  promotionPossible: boolean
  promotionAccepted: boolean
}

const extractComponents = function(move: string): MoveComponents | null {
  const moveRegex = /^(\+?[KPLNSGRB])([1-9][1-9])?(-|\*|x)?([1-9])([1-9])(=|\+)?/;
  const moveMatches = move.match(moveRegex) || [];
  if (exists(moveMatches)) {
    return {
      movingPiece: moveMatches[1],
      fromId: moveMatches[2],
      moveType: moveMatches[3],
      toFile: moveMatches[4],
      toRank: moveMatches[5],
      promotion: moveMatches[6]
    };
  } else {
    return null;
  }
};

const possibleOuFroms = function(toX: number, toY: number): Array<Point> {
  let possibleFroms = [];
  let yPlus = toY + 1;
  let yMinus = toY - 1;
  let xPlus = toX + 1;
  let xMinus = toX - 1;

  possibleFroms.push({ x: xMinus, y: yMinus});
  possibleFroms.push({ x: toX, y: yMinus});
  possibleFroms.push({ x: xPlus, y: yMinus});

  possibleFroms.push({ x: xMinus, y: toY});
  possibleFroms.push({ x: xPlus, y: toY});

  possibleFroms.push({ x: xMinus, y: yPlus});
  possibleFroms.push({ x: toX, y: yPlus});
  possibleFroms.push({ x: xPlus, y: yPlus});

  return possibleFroms;
};

const possibleFuhyouFroms = function(toX: number, toY: number, forwardDirection: number): Array<Point> {
  let yForward = toY - forwardDirection;
  return [{ x: toX, y: yForward }];
};

const possibleKyoushaFroms = function(toX: number, toY: number, forwardDirection: number): Array<Point> {
  let counterY = toY - forwardDirection;
  let possibleFroms = [];
  while (MIN <= counterY && counterY <= MAX) {
    possibleFroms.push({ x: toX , y: counterY });
    counterY -= forwardDirection;
  }
  return possibleFroms;
};

const possibleKeimaFroms = function(toX: number, toY: number, forwardDirection: number): Array<Point> {
  let yForward = toY - 2*forwardDirection;
  let xPlus = toX + 1;
  let xMinus = toX - 1;

  let possibleFroms = [];
  if (MIN <= yForward && yForward <= MAX) {
    if (MIN <= xMinus && xMinus <= MAX) {
      possibleFroms.push({ x: xMinus, y: yForward });
    }
    if (MIN <= xPlus && xPlus <= MAX) {
      possibleFroms.push({ x: xPlus, y: yForward });
    }
  }
  return possibleFroms;
};

const possibleGinFroms = function(toX: number, toY: number, forwardDirection: number): Array<Point> {
  let yForward = toY - forwardDirection;
  let yPlus = toY + 1;
  let yMinus = toY - 1;
  let xPlus = toX + 1;
  let xMinus = toX - 1;
  let possibleFroms = [];
  if (MIN <= xMinus && MIN <= yMinus) {
    possibleFroms.push({ x: xMinus, y: yMinus });
  }
  if (xPlus <= MAX && MIN <= yMinus) {
    possibleFroms.push({ x: xPlus, y: yMinus });
  }
  if (xPlus <= MAX && yPlus <= MAX) {
    possibleFroms.push({ x: xPlus, y: yPlus });
  }
  if (MIN <= xMinus && yPlus <= MAX) {
    possibleFroms.push({ x: xMinus, y: yPlus });
  }

  if (MIN <= yForward && yForward <= MAX) {
    possibleFroms.push({ x: toX, y: yForward });
  }
  return possibleFroms;
};

const possibleKinFroms = function(toX: number, toY: number, forwardDirection: number): Array<Point> {
  let yForward = toY - forwardDirection;
  let yPlus = toY + 1;
  let yMinus = toY - 1;
  let xPlus = toX + 1;
  let xMinus = toX - 1;
  let possibleFroms = [];
  if (MIN <= yMinus) {
    possibleFroms.push({ x: toX, y: yMinus });
  }
  if (xPlus <= MAX) {
    possibleFroms.push({ x: xPlus, y: toY });
  }
  if (yPlus <= MAX) {
    possibleFroms.push({ x: toX, y: yPlus });
  }
  if (MIN <= xMinus) {
    possibleFroms.push({ x: xMinus, y: toY });
  }

  if (MIN <= yForward && yForward <= MAX) {
    if (xPlus <= MAX) {
      possibleFroms.push({ x: xPlus, y: yForward });
    }
    if (MIN <= xMinus) {
      possibleFroms.push({ x: xMinus, y: yForward });
    }
  }
  return possibleFroms;
};

const possibleHishaFroms = function(toX: number, toY: number): Array<Point> {
  let counterX;
  let counterY;
  let possibleFroms = [];
  counterX = toX - 1;
  while (MIN <= counterX && counterX <= MAX) {
    possibleFroms.push({ x: counterX, y: toY });
    counterX -= 1;
  }

  counterX = toX + 1;
  while (MIN <= counterX && counterX <= MAX) {
    possibleFroms.push({ x: counterX, y: toY });
    counterX += 1;
  }

  counterY = toY - 1;
  while (MIN <= counterY && counterY <= MAX) {
    possibleFroms.push({ x: toX, y: counterY });
    counterY -= 1;
  }

  counterY = toY + 1;
  while (MIN <= counterY && counterY <= MAX) {
    possibleFroms.push({ x: toX, y: counterY });
    counterY += 1;
  }
  return possibleFroms;
};

const possibleKakugyouFroms = function(toX: number, toY: number): Array<Point> {
  let counterX;
  let counterY;
  let possibleFroms = [];
  counterX = toX - 1;
  counterY = toY - 1;
  while (counterX >= MIN && counterY >= MIN) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX -= 1;
    counterY -= 1;
  }

  counterX = toX + 1;
  counterY = toY - 1;
  while (counterX <= MAX && counterY >= MIN) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX += 1;
    counterY -= 1;
  }

  counterX = toX + 1;
  counterY = toY + 1;
  while (counterX <= MAX && counterY <= MAX) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX += 1;
    counterY += 1;
  }

  counterX = toX - 1;
  counterY = toY + 1;
  while (counterX >= MIN && counterY <= MAX) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX -= 1;
    counterY += 1;
  }
  return possibleFroms;
};

const possibleRyuuouFroms = function(toX: number, toY: number): Array<Point> {
  let counterX;
  let counterY;
  let yPlus = toY + 1;
  let yMinus = toY - 1;
  let xPlus = toX + 1;
  let xMinus = toX - 1;
  let possibleFroms = [];
  counterX = toX - 1;
  while (counterX !== MIN) {
    possibleFroms.push({ x: counterX, y: toY });
    counterX -= 1;
  }

  counterX = toX + 1;
  while (counterX !== MAX) {
    possibleFroms.push({ x: counterX, y: toY });
    counterX += 1;
  }

  counterY = toY - 1;
  while (counterY !== MIN) {
    possibleFroms.push({ x: toX, y: counterY });
    counterY -= 1;
  }

  counterY = toY + 1;
  while (counterY !== MAX) {
    possibleFroms.push({ x: toX, y: counterY });
    counterY += 1;
  }

  possibleFroms.push({ x: xMinus, y: yMinus });
  possibleFroms.push({ x: xPlus, y: yMinus });
  possibleFroms.push({ x: xPlus, y: yPlus });
  possibleFroms.push({ x: xMinus, y: yPlus });

  return possibleFroms;
};

const possibleRyuumaFroms = function(toX: number, toY: number): Array<Point> {
  let counterX;
  let counterY;
  let possibleFroms = [];
  counterX = toX - 1;
  counterY = toY - 1;
  let yPlus = toY + 1;
  let yMinus = toY - 1;
  let xPlus = toX + 1;
  let xMinus = toX - 1;
  while (counterX >= MIN || counterY >= MIN) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX -= 1;
    counterY -= 1;
  }

  counterX = toX + 1;
  counterY = toY - 1;
  while (counterX <= MAX || counterY >= MIN) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX += 1;
    counterY -= 1;
  }

  counterX = toX + 1;
  counterY = toY + 1;
  while (counterX <= MAX || counterY <= MAX) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX += 1;
    counterY += 1;
  }

  counterX = toX - 1;
  counterY = toY + 1;
  while (counterX >= MIN || counterY <= MAX) {
    possibleFroms.push({ x: counterX, y: counterY });
    counterX -= 1;
    counterY += 1;
  }

  possibleFroms.push({ x: toX, y: yMinus });
  possibleFroms.push({ x: xPlus, y: toY });
  possibleFroms.push({ x: toX, y: yPlus });
  possibleFroms.push({ x: xMinus, y: toY });

  return possibleFroms;
};

const getFromId = function(toX: number, toY: number, movingPiece: string, state: GameState): string | undefined {
  let forwardDirection = state.currentPlayerNumber === 1 ? -1 : 1;
  let possibleFroms: Array<Point> = [];
  switch(movingPiece) {
    case 'oushou':
      possibleFroms = possibleOuFroms(toX, toY);
      break;
    case 'gyokushou':
      possibleFroms = possibleOuFroms(toX, toY);
      break;
    case 'fuhyou':
      possibleFroms = possibleFuhyouFroms(toX, toY, forwardDirection);
      break;
    case 'kyousha':
      possibleFroms = possibleKyoushaFroms(toX, toY, forwardDirection);
      break;
    case 'keima':
      possibleFroms = possibleKeimaFroms(toX, toY, forwardDirection);
      break;
    case 'ginshou':
      possibleFroms = possibleGinFroms(toX, toY, forwardDirection);
      break;
    case 'kinshou':
      possibleFroms = possibleKinFroms(toX, toY, forwardDirection);
      break;
    case 'hisha':
      possibleFroms = possibleHishaFroms(toX, toY);
      break;
    case 'kakugyou':
      possibleFroms = possibleKakugyouFroms(toX, toY);
      break;
    case 'tokin':
      possibleFroms = possibleKinFroms(toX, toY, forwardDirection);
      break;
    case 'narikyou':
      possibleFroms = possibleKinFroms(toX, toY, forwardDirection);
      break;
    case 'narikei':
      possibleFroms = possibleKinFroms(toX, toY, forwardDirection);
      break;
    case 'narigin':
      possibleFroms = possibleKinFroms(toX, toY, forwardDirection);
      break;
    case 'ryuuou':
      possibleFroms = possibleRyuuouFroms(toX, toY);
      break;
    case 'ryuuma':
      possibleFroms = possibleRyuumaFroms(toX, toY);
      break;
    default:
      break;
  }

  let square = state.squares.find((s) => {
    let matchesFromPoint = possibleFroms.some((point) => {
      return s.x === point.x && s.y === point.y;
    });

    let matchesPieceType = s.piece !== null && s.piece.type === movingPiece;

    let matchesPlayer = s.piece !== null && s.piece.playerNumber === state.currentPlayerNumber;

    return matchesFromPoint && matchesPieceType && matchesPlayer;
  });

  if (square !== undefined) {
    return square.id;
  } else {
    return undefined
  };
};

const shogiMoveParser = function(move: string, state: GameState): Move | null {
  // extract components
  let components = extractComponents(move);

  if (components !== null) {
    let fromId: string | null = null;
    let toX: number;
    let toY: number;

    if (components.toFile !== undefined && hasKey(FILE_TO_X, components.toFile)) {
      toX = FILE_TO_X[components.toFile];
    } else {
      toX = 0;
    }

    if (components.toRank !== undefined && hasKey(RANK_TO_Y, components.toRank)) {
      toY = RANK_TO_Y[components.toRank];
    } else {
      toY = 0;
    }

    let toId = `${components.toFile}${components.toRank}`;

    let movingPiece = '';
    if (components.movingPiece !== undefined && hasKey(PIECE_MAP, components.movingPiece)) {
      movingPiece = PIECE_MAP[components.movingPiece];
    } else if (components.movingPiece === 'K') {
      if (state.currentPlayerNumber === 1) {
        movingPiece = 'oushou';
      } else {
        movingPiece = 'gyokushou';
      }
    } else {
      movingPiece = '';
    }

    let promotionPossible = components.promotion === '+' || components.promotion === '=';
    let promotionAccepted = components.promotion === '+';

    // if moveType is move or capture
    if (components.moveType === '-' || components.moveType === 'x') {
      // if we are missing one co-ordinate
      let id = components.fromId !== undefined ? components.fromId : getFromId(toX, toY, movingPiece, state);
      if (id !== undefined) {
        return { kind: 'move', fromId: id, pieceId: null, toId: toId, promotionPossible: promotionPossible, promotionAccepted: promotionAccepted };
      } else {
        return null;
      }
    } else {
      // moveType is drop
      let hand = state.hands.find((h) => {
        return h.playerNumber === state.currentPlayerNumber;
      });

      let piece = undefined;

      if (hand !== undefined) {
        piece = hand.pieces.find((p) => {
          return p.type === movingPiece;
        });
      }

      if (piece !== undefined) {
        return { kind: 'drop', fromId: null, pieceId: piece.id, toId: toId, promotionPossible: false, promotionAccepted: false };
      } else {
        return null;
      }
    }
  } else {
    // regex does not match
    return null;
  }
};

export default shogiMoveParser
