import exists from '$lib/utils/exists';

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

const chessMoveParser = function(move, state) {
  // castling
  // 0-0 - King side
  // 0-0-0 - Queen side
  if (move === '0-0' && state.current_player_number === 1) {
    return {
      fromId: 'e1',
      toId: 'g1',
      promotionPieceType: null
    };
  } else if (move === '0-0' && state.current_player_number === 2) {
    return {
      fromId: 'e8',
      toId: 'g8',
      promotionPieceType: null
    };
  } else if (move === '0-0-0' && state.current_player_number === 1) {
    return {
      fromId: 'e1',
      toId: 'c1',
      promotionPieceType: null
    };
  } else if (move === '0-0-0' && state.current_player_number === 2) {
    return {
      fromId: 'e8',
      toId: 'c8',
      promotionPieceType: null
    };
  }

  // ^([RNBQK])?([a-h]?)([1-8]?)x?([a-h])([1-8])([RNBQK])?
  const moveRegex = /^([RNBQK])?([a-h])?([1-8])?(x)?([a-h])([1-8])([RNBQK])?/;
  const moveMatches = move.match(moveRegex);
  let movingPiece = moveMatches[1]; // 1 - moving piece, blank for pawns
  let fromFile = moveMatches[2]; // 2 - file where pawn is moving from, disambiguatiing file for non-pawns (optional)
  let fromRank = moveMatches[3]; // 3 - disambiguating rank (optional)
  let capture = moveMatches[4]; // 4 - capture 
  let toFile = moveMatches[5]; // 5 - destination file
  let toRank = moveMatches[6]; // 6 - destination rank
  let promotionPiece = moveMatches[7]; // 7 - piece promotion, blank when no promotion

  let fromX;
  let fromY;
  let toX = FILE_TO_X[toFile]; 
  let toY = RANK_TO_Y[toRank];
  if (exists(movingPiece)) {
    // non-pawn logic
    if (exists(fromFile)) {
      fromX = FILE_TO_X[fromFile];
    }

    if (exists(fromRank)) {
      fromY = RANK_TO_Y[fromRank];
    }


    // if we are missing one co-ordinate
    if (!exists(fromX) || !exists(fromY)) {
      let pieceBelongsToPlayer;
      // we have no from or partial from co-ordinates
      let from = state.squares.find(function(s) {
        switch(movingPiece) {
          case 'R':
            // same file or rank as destination
            pieceBelongsToPlayer = exists(s.piece) && s.piece.type === 'rook' && s.piece.player_number === state.current_player_number;
            let sameRankOrFile = (s.x === toX || s.y === toY);
            if (exists(fromX)) { 
              return pieceBelongsToPlayer && (s.x === fromX) && sameRankOrFile;
            } else if (exists(fromY)) {
              return pieceBelongsToPlayer && (s.y === fromY) && sameRankOrFile;
            } else {
              return pieceBelongsToPlayer && sameRankOrFile;
            }
            break;
          case 'N':
            // l shape from destination
            pieceBelongsToPlayer = exists(s.piece) && s.piece.type === 'knight' && s.piece.player_number === state.current_player_number;
            let lShape = (((Math.abs(toX - s.x) === 2 && Math.abs(toY - s.y) === 1)) || (Math.abs(toX - s.x) === 1 && Math.abs(toY - s.y) === 2));
            if (exists(fromX)) {
              return pieceBelongsToPlayer && (s.x === fromX) && lShape;
            } else if (exists(fromY)) {
              return pieceBelongsToPlayer && (s.y === fromY) && lShape;
            } else {
              return pieceBelongsToPlayer && lShape;
            }
            break;
          case 'B':
            // diagonal from destination
            pieceBelongsToPlayer = exists(s.piece) && s.piece.type === 'bishop' && s.piece.player_number === state.current_player_number;
            let diagonal = (Math.abs(toX - s.x) === Math.abs(toY - s.y));
            if (exists(fromX)) {
              return pieceBelongsToPlayer && (s.x === fromX) && diagonal;
            } else if (exists(fromY)) {
              return pieceBelongsToPlayer && (s.y === fromY) && diagonal;
            } else {
              return pieceBelongsToPlayer && diagonal;
            }
            break;
          case 'Q':
            // diagonal or orthogonal from destination
            pieceBelongsToPlayer = exists(s.piece) && s.piece.type === 'queen' && s.piece.player_number === state.current_player_number;
            let orthogonalOrDiagonal = ((s.x === toX || s.y === toY) || (Math.abs(toX - s.x) === Math.abs(toY - s.y)));
            if (exists(fromX)) {
              return pieceBelongsToPlayer && (s.x === fromX) && orthogonalOrDiagonal;
            } else if (exists(fromY)) {
              return pieceBelongsToPlayer && (s.y === fromY) && orthogonalOrDiagonal;
            } else {
              return pieceBelongsToPlayer && orthogonalOrDiagonal;
            }
            break;
          case 'K':
            // only king
            pieceBelongsToPlayer = exists(s.piece) && s.piece.type === 'king' && s.piece.player_number === state.current_player_number;
            let oneStepAway = (Math.abs(toX - s.x) === 1 || Math.abs(toY - s.y) === 1);
            if (exists(fromX)) {
              return pieceBelongsToPlayer && (s.x === fromX) && oneStepAway;
            } else if (exists(fromY)) {
              return pieceBelongsToPlayer && (s.y === fromY) && oneStepAway;
            } else {
              return pieceBelongsToPlayer && oneStepAway;
            }
            break;
          default:
            break;
        }
      });

      fromX = from.x;
      fromY = from.y;
    }
  } else {
    // pawn logic
    if (exists(fromFile)) {
      // capture details which file
      fromX = FILE_TO_X[fromFile]; 
    } else {
      // pawn moves from the same file, destination has the same file.
      fromX = toX;
    }

    if (exists(fromRank)) {
      fromY = RANK_TO_Y[fromRank];
    } else {
      let square = state.squares.find(function(s) {
        // square with pawn owned by current player and in above matched file
        return exists(s.piece) && s.piece.type === 'pawn' && s.piece.player_number === state.current_player_number && s.x === fromX; 
      });
      fromY = square.y; 
    }
  }
  // fromX and fromY should be set
  let fromId = `${X_TO_FILE[fromX]}${Y_TO_RANK[fromY]}`;  
  let toId = `${toFile}${toRank}`;

  return {
    fromId: fromId,
    toId: toId ,
    promotionPieceType: PIECE_TYPES[promotionPiece],
  };
}

export default chessMoveParser

