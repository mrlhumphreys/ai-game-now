import type GameState from '$lib/chess/interfaces/GameState';
import type Piece from '$lib/chess/interfaces/Piece';

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

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
const chessStateSerializer = function(state: GameState): string {
  let boardState = generateBoardState(state);
  let player = state.currentPlayerNumber === 1 ? 'w' : 'b';
  let castleMoves = generateCastleMoves(state);
  let enPassantTarget = generateEnPassantTarget(state);

  return `${boardState} ${player} ${castleMoves} ${enPassantTarget} 0 1`;
};

const pieceToChar = function(piece: Piece): string {
  let pieceMapping = PIECE_TYPES[piece.playerNumber]
  if (pieceMapping !== undefined && hasKey(pieceMapping, piece.type)) {
    let mappedPiece = pieceMapping[piece.type];
    if (mappedPiece !== undefined) {
      return mappedPiece;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

const generateBoardState = function(state: GameState): string {
  let rowCounter = 0; 
  let columnCounter = 0;
  let boardState = '';

  while (rowCounter < 8) {
    let blankCounter = 0;
    while (columnCounter < 8) {
      let square = state.squares.find(function(s) { return s.x === columnCounter && s.y === rowCounter; }); 
      if (square !== undefined && square.piece !== null) {
        if (blankCounter !== 0) {
          boardState = boardState + blankCounter;
        }
        let char = pieceToChar(square.piece);
        boardState = boardState + char;
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

const generateCastleMoves = function(state: GameState): string {
  let castleMoves = '';

  let playerOneKingSquare = state.squares.find(function(s) { 
    return s.piece !== null && s.piece.type === 'king' && s.piece.playerNumber === 1; 
  });
  let playerOneKingHasMoved = playerOneKingSquare !== undefined && playerOneKingSquare.piece !== null && playerOneKingSquare.piece.hasMoved;

  let playerOneKingSideRookSquare = state.squares.find(function(s) { 
    return s.piece !== null && s.piece.type === 'rook' && s.piece.playerNumber === 1 && s.x === 7; 
  });
  let playerOneKingSideRookHasMoved = playerOneKingSideRookSquare !== undefined && playerOneKingSideRookSquare.piece !== null && playerOneKingSideRookSquare.piece.hasMoved;

  let playerOneQueenSideRookSquare = state.squares.find(function(s) { 
    return s.piece !== null && s.piece.type === 'rook' && s.piece.playerNumber === 1 && s.x === 0; 
  });
  let playerOneQueenSideRookHasMoved = playerOneQueenSideRookSquare !== undefined && playerOneQueenSideRookSquare.piece !== null && playerOneQueenSideRookSquare.piece.hasMoved;

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
    return s.piece !== null && s.piece.type === 'king' && s.piece.playerNumber === 2; 
  });
  let playerTwoKingHasMoved = playerTwoKingSquare !== undefined && playerTwoKingSquare.piece !== null && playerTwoKingSquare.piece.hasMoved;

  let playerTwoKingSideRookSquare = state.squares.find(function(s) { 
    return s.piece !== null && s.piece.type === 'rook' && s.piece.playerNumber === 2 && s.x === 7; 
  });
  let playerTwoKingSideRookHasMoved = playerTwoKingSideRookSquare !== undefined && playerTwoKingSideRookSquare.piece !== null && playerTwoKingSideRookSquare.piece.hasMoved;

  let playerTwoQueenSideRookSquare = state.squares.find(function(s) { 
    return s.piece !== null && s.piece.type === 'rook' && s.piece.playerNumber === 2 && s.x === 0; 
  });
  let playerTwoQueenSideRookHasMoved = playerTwoQueenSideRookSquare !== undefined && playerTwoQueenSideRookSquare.piece !== null && playerTwoQueenSideRookSquare.piece.hasMoved;

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

const generateEnPassantTarget = function(state: GameState): string {
  let square = state.squares.find(function(s) { return s.piece !== null && s.piece.id === state.lastDoubleStepPawnId; });
  if (square !== undefined) {
    let targetX = square.x;
    let targetY: number;
    
    if (state.currentPlayerNumber === 1) {
      targetY = square.y + 1;
    } else {
      targetY = square.y - 1;
    }

    let target = state.squares.find(function(s) { return s.x === targetX && s.y === targetY; });

    if (target !== undefined) {
      return target.id;
    } else {
      return '-';
    }
  } else {
    return '-';
  }
};

export default chessStateSerializer

