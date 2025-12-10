interface Square {
  x: number;
  y: number;
}

const calculatePositionClass = function(square: Square, pov: number, x_size: number = 8, y_size: number = 8): string {
  let x = undefined;
  let y = undefined;

  if (pov === 2) {
    x = -1 * square.x + (x_size - 1);
  } else {
    x = square.x;
  }

  if (pov === 2) {
    y = -1 * square.y + (y_size - 1);
  } else {
    y = square.y;
  }

  return `position_${x}_${y}`;
};

export default calculatePositionClass

