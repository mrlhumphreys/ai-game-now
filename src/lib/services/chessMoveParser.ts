import type GameState from '$lib/chess/interfaces/GameState';
import type Square from '$lib/chess/interfaces/Square';
import exists from '$lib/utils/exists';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

const FILE_TO_X = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7
};
const RANK_TO_Y = {
  '1': 7,
  '2': 6,
  '3': 5,
  '4': 4,
  '5': 3,
  '6': 2,
  '7': 1,
  '8': 0
};
const X_TO_FILE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const Y_TO_RANK = ['8', '7', '6', '5', '4', '3', '2', '1'];
const PIECE_TYPES = {
  'P': 'pawn',
  'R': 'rook',
  'N': 'knight',
  'B': 'bishop',
  'Q': 'queen',
  'K': 'king'
};

interface MoveComponents {
  movingPiece: string | undefined;
  fromFile: string | undefined;
  fromRank: string | undefined;
  capture: string | undefined;
  toFile: string | undefined;
  toRank: string | undefined;
  promotionPiece: string | undefined;
}

const extractComponents = function(move: string): MoveComponents | null {
  // ^([RNBQK])?([a-h]?)([1-8]?)x?([a-h])([1-8])([RNBQK])?
  const moveRegex = /^([RNBQK])?([a-h])?([1-8])?(x)?([a-h])([1-8])([RNBQK])?/;
  const moveMatches = move.match(moveRegex) || [];
  if (exists(moveMatches)) {
    return {
      movingPiece:  moveMatches[1], // 1 - moving piece, blank for pawns
      fromFile:  moveMatches[2], // 2 - file where pawn is moving from, disambiguatiing file for non-pawns (optional)
      fromRank: moveMatches[3], // 3 - disambiguating rank (optional)
      capture: moveMatches[4], // 4 - capture
      toFile: moveMatches[5], // 5 - destination file
      toRank: moveMatches[6], // 6 - destination rank
      promotionPiece: moveMatches[7] // 7 - piece promotion, blank when no promotion
    };
  } else {
    return null;
  }
};

const chessMoveParser = function(move: string, state: GameState) {
  // castling
  // 0-0 - King side
  // 0-0-0 - Queen side
  if (move === '0-0' && state.currentPlayerNumber === 1) {
    return {
      fromId: 'e1',
      toId: 'g1',
      promotionPieceType: null
    };
  } else if (move === '0-0' && state.currentPlayerNumber === 2) {
    return {
      fromId: 'e8',
      toId: 'g8',
      promotionPieceType: null
    };
  } else if (move === '0-0-0' && state.currentPlayerNumber === 1) {
    return {
      fromId: 'e1',
      toId: 'c1',
      promotionPieceType: null
    };
  } else if (move === '0-0-0' && state.currentPlayerNumber === 2) {
    return {
      fromId: 'e8',
      toId: 'c8',
      promotionPieceType: null
    };
  }

  // extract components
  let components = extractComponents(move);

  if (components !== null) {
    let fromX: number | null = null;
    let fromY: number | null = null;
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

    if (exists(components.movingPiece)) {
      // non-pawn logic
      if (components.fromFile !== undefined && hasKey(FILE_TO_X, components.fromFile)) {
        fromX = FILE_TO_X[components.fromFile];
      }

      if (components.fromRank !== undefined && hasKey(RANK_TO_Y, components.fromRank)) {
        fromY = RANK_TO_Y[components.fromRank];
      }

      // if we are missing one co-ordinate
      if (fromX === null || fromY === null) {
        let pieceBelongsToPlayer;
        // we have no from or partial from co-ordinates
        let from = state.squares.find(function(s) {
          let movingPiece = components === null ? 'X' : components.movingPiece;
          switch(movingPiece) {
            case 'R':
              // same file or rank as destination
              pieceBelongsToPlayer = s.piece !== null && s.piece.type === 'rook' && s.piece.playerNumber === state.currentPlayerNumber;
              let sameRankOrFile = (s.x === toX || s.y === toY);
              if (exists(fromX)) {
                return pieceBelongsToPlayer && (s.x === fromX) && sameRankOrFile;
              } else if (exists(fromY)) {
                return pieceBelongsToPlayer && (s.y === fromY) && sameRankOrFile;
              } else {
                return pieceBelongsToPlayer && sameRankOrFile;
              }
            case 'N':
              // l shape from destination
              pieceBelongsToPlayer = s.piece !== null && s.piece.type === 'knight' && s.piece.playerNumber === state.currentPlayerNumber;
              let lShape = (((Math.abs(toX - s.x) === 2 && Math.abs(toY - s.y) === 1)) || (Math.abs(toX - s.x) === 1 && Math.abs(toY - s.y) === 2));
              if (exists(fromX)) {
                return pieceBelongsToPlayer && (s.x === fromX) && lShape;
              } else if (exists(fromY)) {
                return pieceBelongsToPlayer && (s.y === fromY) && lShape;
              } else {
                return pieceBelongsToPlayer && lShape;
              }
            case 'B':
              // diagonal from destination
              pieceBelongsToPlayer = s.piece !== null && s.piece.type === 'bishop' && s.piece.playerNumber === state.currentPlayerNumber;
              let diagonal = (Math.abs(toX - s.x) === Math.abs(toY - s.y));
              if (exists(fromX)) {
                return pieceBelongsToPlayer && (s.x === fromX) && diagonal;
              } else if (exists(fromY)) {
                return pieceBelongsToPlayer && (s.y === fromY) && diagonal;
              } else {
                return pieceBelongsToPlayer && diagonal;
              }
            case 'Q':
              // diagonal or orthogonal from destination
              pieceBelongsToPlayer = s.piece !== null && s.piece.type === 'queen' && s.piece.playerNumber === state.currentPlayerNumber;
              let orthogonalOrDiagonal = ((s.x === toX || s.y === toY) || (Math.abs(toX - s.x) === Math.abs(toY - s.y)));
              if (exists(fromX)) {
                return pieceBelongsToPlayer && (s.x === fromX) && orthogonalOrDiagonal;
              } else if (exists(fromY)) {
                return pieceBelongsToPlayer && (s.y === fromY) && orthogonalOrDiagonal;
              } else {
                return pieceBelongsToPlayer && orthogonalOrDiagonal;
              }
            case 'K':
              // only king
              pieceBelongsToPlayer = s.piece !== null && s.piece.type === 'king' && s.piece.playerNumber === state.currentPlayerNumber;
              let oneStepAway = (Math.abs(toX - s.x) === 1 || Math.abs(toY - s.y) === 1);
              if (exists(fromX)) {
                return pieceBelongsToPlayer && (s.x === fromX) && oneStepAway;
              } else if (exists(fromY)) {
                return pieceBelongsToPlayer && (s.y === fromY) && oneStepAway;
              } else {
                return pieceBelongsToPlayer && oneStepAway;
              }
            default:
              return false;
          }
        });

        if (from !== undefined) {
          fromX = from.x;
          fromY = from.y;
        } else {
          fromX = 0;
          fromY = 0;
        }
      }
    } else {
      // pawn logic
      if (components.fromFile !== undefined && hasKey(FILE_TO_X, components.fromFile)) {
        // capture details which file
        fromX = FILE_TO_X[components.fromFile];
      } else {
        // pawn moves from the same file, destination has the same file.
        fromX = toX;
      }

      let toY: number;
      if (components.toRank !== undefined && hasKey(RANK_TO_Y, components.toRank)) {
        toY = RANK_TO_Y[components.toRank];
      } else {
        toY = 0;
      }

      let reverseDirectionY = state.currentPlayerNumber === 1 ? 1 : -1;

      if (components.fromRank !== undefined && hasKey(RANK_TO_Y, components.fromRank)) {
        fromY = RANK_TO_Y[components.fromRank];
      } else {
        let squares = state.squares.filter((s) => {
          // square with pawn owned by current player and in above matched file
          return s.piece !== null && s.piece.type === 'pawn' && s.piece.playerNumber === state.currentPlayerNumber && s.x === fromX;
        });

        let square: Square | undefined;
        if ((squares).length > 1) {
          // there are two pawns in the same file. Work our way backwards until we find the first pawn.
          let counter = toY + reverseDirectionY;
          while (counter < 8 && counter > -1) {
            let s = squares.find((s) => {
              return s.y === counter;
            });

            if (s !== undefined) {
              square = s;
              break;
            }

            counter = counter + reverseDirectionY;
          }
        } else {
          square = squares[0];
        }

        if (square !== undefined) {
          fromY = square.y;
        } else {
          fromY = 0;
        }
      }
    }
    // fromX and fromY should be set
    let fromId = `${X_TO_FILE[fromX]}${Y_TO_RANK[fromY]}`;
    let toId = `${components.toFile}${components.toRank}`;
    let promotionPieceType;

    if (components.promotionPiece !== undefined && hasKey(PIECE_TYPES, components.promotionPiece)) {
      promotionPieceType = PIECE_TYPES[components.promotionPiece];
    } else {
      promotionPieceType = null;
    }

    return {
      fromId: fromId,
      toId: toId ,
      promotionPieceType: promotionPieceType
    };
  } else {
    // no components
    return null;
  }
}

export default chessMoveParser

