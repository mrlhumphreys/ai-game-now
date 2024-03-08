const backgammonMoveParser = function(move: string, state: Object): Array<Array<number | 'bar' | 'offBoard'>> {
  // ignore first element (dice), return up to 4 moves
  return move.replace(/\n$/, "").split(/\s/).slice(1,5).map(function(m) {
    return m.split(/\//).map(function(n) {
      if (n === 'bar') {
        return 'bar';
      } else if (n === 'off') {
        return 'offBoard';
      } else {
        return parseInt(n);
      }
    });
  });
}

export default backgammonMoveParser

