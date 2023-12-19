const calculatePositionClass = function(square, pov) {
  let x = undefined;
  let y = undefined;

  if (pov === 1) {
    x = -1 * square.x + 7;
  } else {
    x = square.x;
  }

  if (pov === 1) {
    y = -1 * square.y + 7;
  } else {
    y = square.y;
  }

  return `position_${x}_${y}`;
};

export default calculatePositionClass

