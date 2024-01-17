const calculateBackgroundColour = function(playerNumber: number, selected: boolean): string {
  if (selected) {
    return '#ffffff';
  } else {
    switch (playerNumber) {
      case 1:
        return '#303030';
      case 2:
        return '#3cc5de';
      default:
        return '#ffffff';
    }
  }
};

export default calculateBackgroundColour

