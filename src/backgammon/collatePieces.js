const pointPieces = function(matchState) {
  return matchState.game_state.points.map((point) => {
    return point.pieces.map((piece, pieceIndex) => {
      return {
        piece: piece,
        point: point,
        pieceIndex: pieceIndex
      };
    });
  }).flat().sort((a, b) => {
    return a.piece.id - b.piece.id;
  });
};

const barPieces = function(matchState) {
  let barOnePieces = matchState.game_state.bar.pieces.filter((piece) => {
    return piece.player_number === 1;
  }).map((piece, pieceIndex) => {
    return {
      point: { number: 'bar', selected: matchState.game_state.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let barTwoPieces = matchState.game_state.bar.pieces.filter((piece) => {
    return piece.player_number === 2;
  }).map((piece, pieceIndex) => {
    return {
      point: { number: 'bar', selected: matchState.game_state.bar.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  return barOnePieces.concat(barTwoPieces);
};

const offBoardPieces = function(matchState) {
  let offBoardOnePieces = matchState.game_state.off_board.pieces.filter((piece) => {
    return piece.player_number === 1;
  }).map((piece, pieceIndex) => {
    return {
      point: { number: 'off_board', selected: matchState.game_state.off_board.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  let offBoardTwoPieces = matchState.game_state.off_board.pieces.filter((piece) => {
    return piece.player_number === 2;
  }).map((piece, pieceIndex) => {
    return {
      point: { number: 'off_board', selected: matchState.game_state.off_board.selected },
      piece: piece,
      pieceIndex: pieceIndex
    };
  });

  return offBoardOnePieces.concat(offBoardTwoPieces);
};

const collatePieces = function(matchState) {
  return pointPieces(matchState).concat(barPieces(matchState)).concat(offBoardPieces(matchState)).sort((a, b) => {
    return a.piece.id - b.piece.id;
  });
};

export default collatePieces;
