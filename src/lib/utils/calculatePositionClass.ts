interface Square {
  x: number;
  y: number;
}
const calculatePositionClass = function(square: Square, pov: number, size: number = 8): string {
  let x = undefined;
  let y = undefined;

  if (pov === 2) {
    x = -1 * square.x + (size - 1);
  } else {
    x = square.x;
  }

  if (pov === 2) {
    y = -1 * square.y + (size - 1);
  } else {
    y = square.y;
  }

  return `position_${x}_${y}`;
};

export default calculatePositionClass

