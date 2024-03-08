import type Match from '$lib/backgammon/interfaces/Match';
import type Piece from '$lib/backgammon/interfaces/Piece';
import type Point from '$lib/backgammon/interfaces/Point';

interface SimplePoint {
  number: number | 'bar' | 'offBoard';
  selected: boolean
}

interface SimplePiece {
  piece: Piece;
  point: SimplePoint;
  pieceIndex: number;
}

const pointPieces = function(matchState: Match): Array<SimplePiece> {
  return matchState.gameState.points.map((point: Point) => {
    return point.pieces.map((piece: Piece, pieceIndex: number): SimplePiece => {
      return {
        piece: piece,
        point: { number: point.number, selected: point.selected },
        pieceIndex: pieceIndex
      };
    });
  }).flat().sort((a, b) => {
    return a.piece.id - b.piece.id;
  });
};

const barPieces = function(matchState: Match): Array<SimplePiece> {
  let barOnePieces = matchState.gameState.bar.pieces.filter((piece: Piece) => {
    return piece.playerNumber === 1;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'bar', selected: matchState.gameState.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let barTwoPieces = matchState.gameState.bar.pieces.filter((piece) => {
    return piece.playerNumber === 2;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'bar', selected: matchState.gameState.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  return barOnePieces.concat(barTwoPieces);
};

const offBoardPieces = function(matchState: Match): Array<SimplePiece> {
  let offBoardOnePieces = matchState.gameState.offBoard.pieces.filter((piece: Piece) => {
    return piece.playerNumber === 1;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'offBoard', selected: matchState.gameState.offBoard.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let offBoardTwoPieces = matchState.gameState.offBoard.pieces.filter((piece: Piece) => {
    return piece.playerNumber === 2;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'offBoard', selected: matchState.gameState.offBoard.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  return offBoardOnePieces.concat(offBoardTwoPieces);
};

const collatePieces = function(matchState: Match): Array<SimplePiece> {
  return pointPieces(matchState).concat(barPieces(matchState)).concat(offBoardPieces(matchState)).sort((a, b) => {
    return a.piece.id - b.piece.id;
  });
};

export default collatePieces;

