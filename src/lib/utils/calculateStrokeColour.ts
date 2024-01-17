const calculateStrokeColour = function(playerNumber: number): string {
  switch (playerNumber) {
    case 1:
      return '#3cc5de';
    case 2:
      return '#303030';
    default:
      return '#000000';
  }
};

export default calculateStrokeColour

