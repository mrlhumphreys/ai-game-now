import exists from '../utils/exists'

const PIECE_TYPES = [
  {},
  {
    'pawn': 'P',
    'rook': 'R',
    'knight': 'N',
    'bishop': 'B',
    'queen': 'Q',
    'king': 'K'
  },
  {
    'pawn': 'p',
    'rook': 'r',
    'knight': 'n',
    'bishop': 'b',
    'queen': 'q',
    'king': 'k'
  }
];

// Example: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
const chessStateSerializer = function(state) {
  let boardState = generateBoardState(state);
  let player = state.current_player_number === 1 ? 'w' : 'b';
  let castleMoves = generateCastleMoves(state);
  let enPassantTarget = generateEnPassantTarget(state);

  return `${boardState} ${player} ${castleMoves} ${enPassantTarget} 0 1`;
};

const generateBoardState = function(state) {
  let rowCounter = 0; 
  let columnCounter = 0;
  let boardState = '';

  while (rowCounter < 8) {
    let blankCounter = 0;
    while (columnCounter < 8) {
      let square = state.squares.find(function(s) { return s.x === columnCounter && s.y === rowCounter; }); 
      if (exists(square.piece)) {
        if (blankCounter !== 0) {
          boardState = boardState + blankCounter;
        }
        boardState = boardState + PIECE_TYPES[square.piece.player_number][square.piece.type];
        blankCounter = 0;  
      } else {
        blankCounter += 1;
      }

      // if last column
      if (columnCounter === 7) {
        if (blankCounter > 0) {
          boardState = boardState + blankCounter;
        } 
        // if not the last row
        if (rowCounter !== 7) {
          boardState = boardState + '/';
        }
      }
      columnCounter += 1;
    }
    columnCounter = 0;
    rowCounter += 1;
  }

  return boardState;
};

const generateCastleMoves = function(state) {
  let castleMoves = '';

  let playerOneKingSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'king' && s.piece.player_number === 1; 
  });
  let playerOneKingHasMoved = playerOneKingSquare.piece.has_moved;

  let playerOneKingSideRookSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'rook' && s.piece.player_number === 1 && s.x === 7; 
  });
  let playerOneKingSideRookHasMoved = exists(playerOneKingSideRookSquare) && playerOneKingSideRookSquare.piece.has_moved;

  let playerOneQueenSideRookSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'rook' && s.piece.player_number === 1 && s.x === 0; 
  });
  let playerOneQueenSideRookHasMoved = exists(playerOneQueenSideRookSquare) && playerOneQueenSideRookSquare.piece.has_moved;

  // TODO: and no pieces in between
  let playerOneKingSideCastle = !playerOneKingHasMoved && !playerOneKingSideRookHasMoved; 
  let playerOneQueenSideCastle = !playerOneKingHasMoved && !playerOneQueenSideRookHasMoved; 

  if (playerOneKingSideCastle) {
    castleMoves = castleMoves + 'K'; 
  }

  if (playerOneQueenSideCastle) {
    castleMoves = castleMoves + 'Q'; 
  }

  let playerTwoKingSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'king' && s.piece.player_number === 2; 
  });
  let playerTwoKingHasMoved = exists(playerTwoKingSquare) && playerTwoKingSquare.piece.has_moved;

  let playerTwoKingSideRookSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'rook' && s.piece.player_number === 2 && s.x === 7; 
  });
  let playerTwoKingSideRookHasMoved = exists(playerTwoKingSideRookSquare) && playerTwoKingSideRookSquare.piece.has_moved;

  let playerTwoQueenSideRookSquare = state.squares.find(function(s) { 
    return exists(s.piece) && s.piece.type === 'rook' && s.piece.player_number === 2 && s.x === 0; 
  });
  let playerTwoQueenSideRookHasMoved = exists(playerTwoQueenSideRookSquare) && playerTwoQueenSideRookSquare.piece.has_moved;

  let playerTwoKingSideCastle = !playerTwoKingHasMoved && !playerTwoKingSideRookHasMoved; 
  let playerTwoQueenSideCastle = !playerTwoKingHasMoved && !playerTwoQueenSideRookHasMoved; 

  if (playerTwoKingSideCastle) {
    castleMoves = castleMoves + 'k'; 
  }

  if (playerTwoQueenSideCastle) {
    castleMoves = castleMoves + 'q'; 
  }

  return castleMoves;
};

const generateEnPassantTarget = function(state) {
  let square = state.squares.find(function(s) { return exists(s.piece) && s.piece.id === state.last_double_step_pawn_id; });
  if (exists(square)) {
    let targetX = square.x;
    let targetY;
    
    if (state.currentPlayerNumber === 1) {
      targetY = square.y + 1;
    } else {
      targetY = square.y - 1;
    }

    let target = state.squares.find(function(s) { return s.x === targetX && s.y === targetY; })

    return target.id;
  } else {
    return '-';
  }
};

export default chessStateSerializer

