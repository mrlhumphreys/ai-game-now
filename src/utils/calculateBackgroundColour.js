const calculateBackgroundColour = function(piece) {
  if (piece.selected) {
    return '#ffffff';
  } else {
    switch (piece.player_number) {
      case 1:
        return '#303030';
        break;
      case 2:
        return '#3cc5de';
        break;
      default:
        return '#ffffff';
    }
  }
};

export default calculateBackgroundColour
