import type GameState from '$lib/xiangqi/interfaces/GameState';
import type Square from '$lib/xiangqi/interfaces/Square';
import type PieceType from '$lib/xiangqi/types/PieceType';

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
  '9': 8,
  '10': 9
};

const PIECE_MAP = {
  '1': 'soldier' as const,
  '2': 'soldier' as const,
  '3': 'soldier' as const,
  '4': 'soldier' as const,
  '5': 'soldier' as const,
  'P': 'soldier' as const,
  'R': 'chariot' as const,
  'H': 'horse' as const,
  'E': 'elephant' as const,
  'A': 'advisor' as const,
  'K': 'king' as const,
  'C': 'cannon' as const
};

const MIN_X = 0;
const MAX_X = 8;
const MIN_Y = 0;
const MAX_Y = 9;

// Reference:
// Piece
// Disambiguation + forward, - rear,
//   pawn triple: 1 forward , 2 middle, 3 rear
// Starting File
// Direction + - =
// Number of squares moved vertical || end file horizontally
//
// E7+9 - piece
// P9+1 - soldier (same as above)
// R++2 - piece Disambiguation (2 in same file)
// 19+1 - soldier disambiguation (3 or more soldier in same file)
// R1+2 - move forwards
// R1-2 - move backwards
// R1=3 - move horizontal

interface MoveComponents {
  movingPiece: string | undefined;
  fromFileOrRank: string | undefined;
  direction: string | undefined;
  distanceOrFile: string | undefined;
}

interface Move {
  fromId: string | null;
  toId: string;
}

const extractComponents = function(move: string): MoveComponents | null {
  const moveRegex = /^([PRHEAKC]|[12345])([1-9]|\+|-)(\+|-|=)([1-9])/;
  const moveMatches = move.match(moveRegex) || [];
  if (exists(moveMatches)) {
    return {
      movingPiece: moveMatches[1],
      fromFileOrRank: moveMatches[2],
      direction: moveMatches[3],
      distanceOrFile: moveMatches[4]
    };
  } else {
    return null;
  }
};

const findFrom = function(movingPiece: string | undefined, state: GameState, fromFileOrRank: string | undefined): Square | undefined {
  if (movingPiece !== undefined && hasKey(PIECE_MAP, movingPiece)) {
    let pieceType = PIECE_MAP[movingPiece];
    let potentialFroms: Array<Square> = [];

    if (['1','2','3','4','5'].includes(movingPiece) && fromFileOrRank !== undefined && hasKey(FILE_TO_X, fromFileOrRank)) {
      let x = FILE_TO_X[fromFileOrRank];
      potentialFroms = state.squares.filter((s) => {
        return s.piece && s.piece.type === pieceType && s.piece.playerNumber === state.currentPlayerNumber && s.x === x; 
      });
    } else {
      potentialFroms = state.squares.filter((s) => {
        return s.piece && s.piece.type === pieceType && s.piece.playerNumber === state.currentPlayerNumber; 
      });
    }

    potentialFroms.sort((a, b) => {
      // sort depending on player - first is forward
      // player 1 - lowest y first 
      // player 2 - highest y first
      if (state.currentPlayerNumber === 1) {
        return a.y - b.y;
      } else {
        return b.y - a.y;
      }
    });

    switch (potentialFroms.length) {
      case 1:
        // if only one, pick it.
        return potentialFroms[0];
      case 2:
        if (potentialFroms[0] !== undefined && potentialFroms[1] !== undefined) {
          if (potentialFroms[0].x === potentialFroms[1].x) {
            // if two and in same file - fromFileOrRank is - (back) or + (forward) rank
            if (fromFileOrRank === '+') {
              // forward piece
              return potentialFroms[0];
            } else if (fromFileOrRank === '-') {
              // back piece
              return potentialFroms[1];
            } else {
              return undefined;
            }
          } else {
            // if not in the same file -> fromFileOrRank is file
            if (fromFileOrRank !== undefined && hasKey(FILE_TO_X, fromFileOrRank)) {
              let x = FILE_TO_X[fromFileOrRank];
              return potentialFroms.find((s) => { return s.x === x; });
            } else {
              return undefined;
            }
          }
        } else {
          return undefined;
        }
      default:
        // if more than two
        if (['1','2','3','4','5'].includes(movingPiece)) {
          // movingPiece is number (1=front) (2=second from front)
          let idx = parseInt(movingPiece) - 1;
          return potentialFroms[idx];
        } else {
          // movingPiece is P. Find the soldier in the specified file
          if (fromFileOrRank !== undefined && hasKey(FILE_TO_X, fromFileOrRank)) {
            let x = FILE_TO_X[fromFileOrRank];
            return potentialFroms.find((s) => { return s.x === x; });
          } else {
            return undefined;
          }
        }
    }
  } else {
    return undefined;
  }
};

const findTo = function(fromX: number, fromY: number, playerNumber: number, movingPiece: string | undefined, direction: string | undefined, distanceOrFile: string | undefined, state: GameState): Square | undefined {
  let toX = newX(movingPiece, fromX, direction, distanceOrFile);
  let toY = newY(movingPiece, state.currentPlayerNumber, fromX, fromY, direction, distanceOrFile);
  let moveTo = state.squares.find((s) => {
    return s.x === toX && s.y === toY; 
  });
  return moveTo;
};

const newX = function(movingPiece: string | undefined, fromX: number, direction: string | undefined, distanceOrFile: string | undefined): number {
  if (movingPiece !== undefined && hasKey(PIECE_MAP, movingPiece)) {
    let pieceType = PIECE_MAP[movingPiece];
    // horse elephant and advisor will move sideways and requires file
    // other pieces that move only sideways also require file
    if (['horse', 'elephant', 'advisor'].includes(pieceType) || direction === '=') {
      if (distanceOrFile !== undefined && hasKey(FILE_TO_X, distanceOrFile)) {
        return FILE_TO_X[distanceOrFile];
      } else {
        return fromX;
      }
    } else {
      return fromX;
    }
  } else {
    return fromX;
  }
};

const newY = function(movingPiece: string | undefined, playerNumber: number, fromX: number, fromY: number, direction: string | undefined, distanceOrFile: string | undefined): number {
  if (distanceOrFile !== undefined && hasKey(FILE_TO_X, distanceOrFile) && movingPiece !== undefined && hasKey(PIECE_MAP, movingPiece)) {
    let pieceType = PIECE_MAP[movingPiece];
    let toX = FILE_TO_X[distanceOrFile];
    let distance = parseInt(distanceOrFile);
    switch (pieceType) {
      case 'horse':
        switch(direction) {
          case '+':
            if (Math.abs(toX - fromX) === 1) {
              if (playerNumber === 1) {
                return fromY - 2;
              } else {
                return fromY + 2;
              }
            } else {
              if (playerNumber === 1) {
                return fromY - 1;
              } else {
                return fromY + 1;
              }
            }
          case '-':
            if (Math.abs(toX - fromX) === 1) {
              if (playerNumber === 1) {
                return fromY + 2;
              } else {
                return fromY - 2;
              }
            } else {
              if (playerNumber === 1) {
                return fromY + 1;
              } else {
                return fromY - 1;
              }
            }
          default:
            return fromY; 
        }
      case 'elephant':
        switch(direction) {
          case '+':
            if (playerNumber === 1) {
              return fromY - 2;
            } else {
              return fromY + 2;
            }
          case '-':
            if (playerNumber === 1) {
              return fromY + 2;
            } else {
              return fromY - 2;
            }
          default:
            return fromY;
        }
      case 'advisor':
        switch(direction) {
          case '+':
            if (playerNumber === 1) {
              return fromY - 1;
            } else {
              return fromY + 1;
            }
          case '-':
            if (playerNumber === 1) {
              return fromY + 1;
            } else {
              return fromY - 1;
            }
          default:
            return fromY;
        }
      default:
        switch(direction) {
          case '+':
            if (playerNumber === 1) {
              return fromY - distance;
            } else {
              return fromY + distance;
            }
          case '-':
            if (playerNumber === 1) {
              return fromY + distance;
            } else {
              return fromY - distance;
            }
          default:
            return fromY;
        }
    }
  } else {
    return fromY;
  }
};

const xiangqiMoveParser = function(move: string, state: GameState): Move | null {
  // extract components
  let components = extractComponents(move);

  if (components !== null) {
    let moveFrom = findFrom(components.movingPiece, state, components.fromFileOrRank);

    if (moveFrom !== undefined) {
      let moveTo = findTo(moveFrom.x, moveFrom.y, state.currentPlayerNumber, components.movingPiece, components.direction, components.distanceOrFile, state);
      if (moveTo !== undefined) {
        return {
          fromId: moveFrom.id,
          toId: moveTo.id 
        };
      } else {
        // no to found
        return null;
      }
    } else {
      // no from found
      return null;
    }
  } else {
    // regex does not match
    return null;
  }
};

export default xiangqiMoveParser
