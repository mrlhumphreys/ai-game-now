import type Match from '$lib/backgammon/interfaces/Match';
import type Piece from '$lib/backgammon/interfaces/Piece';
import type Point from '$lib/backgammon/interfaces/Point';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';

interface SimplePoint {
  number: number | 'bar' | 'off_board';
  selected: boolean
}

interface SimplePiece {
  piece: Piece;
  point: SimplePoint;
  pieceIndex: number;
}

const pointPieces = function(matchState: Match): Array<SimplePiece> {
  return matchState.game_state.points.map((point: Point) => {
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
  let barOnePieces = matchState.game_state.bar.pieces.filter((piece: Piece) => {
    return piece.player_number === 1;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'bar', selected: matchState.game_state.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let barTwoPieces = matchState.game_state.bar.pieces.filter((piece) => {
    return piece.player_number === 2;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'bar', selected: matchState.game_state.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  return barOnePieces.concat(barTwoPieces);
};

const offBoardPieces = function(matchState: Match): Array<SimplePiece> {
  let offBoardOnePieces = matchState.game_state.off_board.pieces.filter((piece: Piece) => {
    return piece.player_number === 1;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'off_board', selected: matchState.game_state.off_board.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let offBoardTwoPieces = matchState.game_state.off_board.pieces.filter((piece: Piece) => {
    return piece.player_number === 2;
  }).map((piece: Piece, pieceIndex: number): SimplePiece => {
    return {
      point: { number: 'off_board', selected: matchState.game_state.off_board.selected },
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

