const checkersMoveParser = function(move) {
  return move.split(/-|x/).map(function(e) { return parseInt(e); });
}

export default checkersMoveParser

