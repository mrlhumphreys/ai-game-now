const calculateStrokeColour = function(piece) {
  switch (piece.player_number) {
    case 1:
      return '#3cc5de';
      break;
    case 2:
      return '#303030';
      break;
    default:
      return '#000000';
  }
};

export default calculateStrokeColour
