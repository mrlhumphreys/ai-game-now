import type GameState from '$lib/go/interfaces/GameState';
import type Point from '$lib/go/interfaces/Point';

// "PL[B]AB[cb]AW[de]XB[0]XW[0]
// PL[W] or PL[B] - Player Turn
// AB[bb:ee]AW[bb][ee][dc][cd][cb][bc][be][eb][ed][de] - Setup board
// XS[ab][cd]  - Previously Captured Pieces
// XW[0] XB[0] - Number of stones captured
// AB[tt] - pass
const goStateSerializer = function(state: GameState): string {
  let currentPlayerCode = (state.currentPlayerNumber === 2 ? 'W' : 'B');

  let stoneComparisonFunction = function(a: Point, b: Point): number {
    if (a.stone !== null && b.stone !== null) {
      return a.stone.id - b.stone.id;
    } else {
      return 0;
    }
  };

  let blackStones = state.points.filter(function(p) { return p.stone !== null && p.stone.playerNumber === 1; }).sort(stoneComparisonFunction).map(function(p) { return `[${p.id}]`; }).join('');
  let whiteStones = state.points.filter(function(p) { return p.stone !== null && p.stone.playerNumber === 2; }).sort(stoneComparisonFunction).map(function(p) { return `[${p.id}]`; }).join('');

  let blackPlayerStat = state.playerStats.find(function(ps) { return ps.playerNumber === 1; });
  let blackPrisonerCount = (blackPlayerStat !== undefined ? blackPlayerStat.prisonerCount : 0);
  let blackPass = (blackPlayerStat !== undefined && blackPlayerStat.passed ? '[tt]' : '');
  let whitePlayerStat = state.playerStats.find(function(ps) { return ps.playerNumber === 2; });
  let whitePrisonerCount = (whitePlayerStat !== undefined ? whitePlayerStat.prisonerCount : 0);
  let whitePass = (whitePlayerStat !== undefined && whitePlayerStat.passed ? '[tt]' : '');

  let capturedPoints: Array<string> = [];

  Array.from(state.previousState).forEach(function(previousPoint, i) {
    if (previousPoint === '1' || previousPoint === '2') {
        let currentPoint = state.points[i];
        if (currentPoint !== undefined && currentPoint.stone === null) {
          // stone captured
          let pos = currentPoint.id;
          if (pos !== undefined) {
            capturedPoints.push(pos);
          }
        }
    }
  });

  let capturedPointsString = capturedPoints.map(function(p) { return `[${p}]`; }).join('');

  return `PL[${currentPlayerCode}]AB${blackStones}${blackPass}AW${whiteStones}${whitePass}XB[${blackPrisonerCount}]XW[${whitePrisonerCount}]XS${capturedPointsString}`;
};

export default goStateSerializer
