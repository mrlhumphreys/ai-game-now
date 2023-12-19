const calculateBackgroundColour = function(playerNumber, selected) {
  if (selected) {
    return '#ffffff';
  } else {
    switch (playerNumber) {
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

