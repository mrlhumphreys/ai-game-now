const checkersMoveParser = function(move: string, state: Object): Array<number> {
  return move.split(/-|x/).map(function(e) { return parseInt(e); });
}

export default checkersMoveParser

