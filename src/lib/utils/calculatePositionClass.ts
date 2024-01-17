interface Square {
  x: number;
  y: number;
}
const calculatePositionClass = function(square: Square, pov: number): string {
  let x = undefined;
  let y = undefined;

  if (pov === 2) {
    x = -1 * square.x + 7;
  } else {
    x = square.x;
  }

  if (pov === 2) {
    y = -1 * square.y + 7;
  } else {
    y = square.y;
  }

  return `position_${x}_${y}`;
};

export default calculatePositionClass

