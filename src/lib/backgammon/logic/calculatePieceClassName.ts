const calculateBarClassName = function(pov: number, playerNumber: number, pieceIndex: number): string {
  let position = undefined;
  if ((pov === 2 && playerNumber === 1) || (pov === 1 && playerNumber === 2)) {
    position = 'top';
  } else {
    position = 'bottom';
  }
  return `piece position_bar_${position}_${pieceIndex}`;
};

const calculateOffBoardClassName = function(pov: number, playerNumber: number, pieceIndex: number): string {
  let xPosition = undefined;

  if (pov === 2) {
    xPosition = 'left';
  } else {
    xPosition = 'right';
  }

  let yPosition = undefined;

  if ((pov === 2 && playerNumber === 1) || (pov === 1 && playerNumber === 2)) {
    yPosition = 'bottom';
  } else {
    yPosition = 'top';
  }

  return `piece position_off_board_${xPosition}_${yPosition}_${pieceIndex}`;
};

const calculatePointClassName = function(pov: number, pointNumber: number, pieceIndex: number): string {
  let povPointNumber = undefined;
  if (pov === 2) {
    if (pointNumber <= 12) {
      povPointNumber = pointNumber + 12;
    } else {
      povPointNumber = pointNumber - 12;
    }
  } else {
    povPointNumber = pointNumber;
  }
  return `piece position_${povPointNumber}_${pieceIndex}`;
};

const calculatePieceClassName = function(pov: number, playerNumber: number, pointNumber: number | 'bar' | 'offBoard', pieceIndex: number): string {
  switch (pointNumber) {
    case 'bar':
      return calculateBarClassName(pov, playerNumber, pieceIndex);
    case 'offBoard':
      return calculateOffBoardClassName(pov, playerNumber, pieceIndex);
    default:
      return calculatePointClassName(pov, pointNumber, pieceIndex);
  }
};

export default calculatePieceClassName

