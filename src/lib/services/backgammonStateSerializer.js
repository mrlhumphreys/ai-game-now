const pointToString = function(point) {
  let playerOnePiecesCount = point.pieces.filter(function(p) { return p.player_number === 1; }).length.toString(16);
  let playerTwoPiecesCount = point.pieces.filter(function(p) { return p.player_number === 2; }).length.toString(16);
  return `${playerOnePiecesCount}${playerTwoPiecesCount}`;
};

const pointsToString = function(points) {
  return points.map(function(p) { return pointToString(p); }).join('');
};

const dieToString = function(die) {
  if (die.number === null) {
    return '-';
  } else {
    return die.number.toString();
  }
};

const diceToString = function(dice) {
  return dice.slice(0,2).map(function(d) { return dieToString(d); }).join('');
};

const backgammonStateSerializer = function(state) {
  let bar = pointToString(state.bar);
  let points = pointsToString(state.points);
  let offBoard = pointToString(state.off_board);
  let dice = diceToString(state.dice);
  let player = state.current_player_number;
  return `${bar}${points}${offBoard}${dice}${player}`;
}

export default backgammonStateSerializer

