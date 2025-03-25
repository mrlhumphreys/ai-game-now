import type Piece from '$lib/shogi/interfaces/Piece';

const calculatePieceInHandPositionClass = function(piece: Piece, pov: number): string {
  let position;

  if (piece.playerNumber === pov) {
    position = 'bottom';
  } else {
    position = 'top';
  }

  return `position_hand_${position}_${piece.type}`;
};

export default calculatePieceInHandPositionClass

