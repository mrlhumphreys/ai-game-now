import type GameState from '$lib/shogi/interfaces/GameState';
import type Square from '$lib/shogi/interfaces/Square';
import type Piece from '$lib/shogi/interfaces/Piece';

interface PieceWithContext {
  piece: Piece;
  pov: number;
  context: string;
  square: Square | null;
}

const piecesWithContext = function(gameState: GameState, pov: number): Array<PieceWithContext> {
  let pieces: Array<PieceWithContext> = [];

  gameState.squares.forEach((square) => {
    if (square.piece !== null) {
      pieces.push({
        piece: square.piece,
        pov: pov,
        context: 'square',
        square: square,
      });
    }
  });

  let playerOneHand = gameState.hands.find((h) => h.playerNumber === 1);
  if (playerOneHand !== undefined) {
    playerOneHand.pieces.forEach((piece) => {
      pieces.push({
        piece: piece,
        pov: pov,
        context: 'hand',
        square: null,
      });
    });
  }

  let playerTwoHand = gameState.hands.find((h) => h.playerNumber === 2);
  if (playerTwoHand !== undefined) {
    playerTwoHand.pieces.map((piece) => {
      pieces.push({
        piece: piece,
        pov: pov,
        context: 'hand',
        square: null,
      });
    });
  }

  return pieces.sort((a, b) => {
    return a.piece.id - b.piece.id;
  });
}

export default piecesWithContext
