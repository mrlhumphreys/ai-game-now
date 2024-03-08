import type Die from '$lib/backgammon/interfaces/Die';
import type Point from '$lib/backgammon/interfaces/Point';
import type Bar from '$lib/backgammon/interfaces/Bar';
import type OffBoard from '$lib/backgammon/interfaces/OffBoard';
import type GameState from '$lib/backgammon/interfaces/GameState';
import exists from '$lib/utils/exists';

const pointToString = function(point: Point | Bar | OffBoard): string {
  let playerOnePiecesCount = point.pieces.filter(function(p) { return p.playerNumber === 1; }).length.toString(16);
  let playerTwoPiecesCount = point.pieces.filter(function(p) { return p.playerNumber === 2; }).length.toString(16);
  return `${playerOnePiecesCount}${playerTwoPiecesCount}`;
};

const pointsToString = function(points: Array<Point>): string {
  return points.map(function(p) { return pointToString(p); }).join('');
};

const dieToString = function(die: Die): string {
  if (exists(die.number)) {
    return die.number?.toString() ?? '-';
  } else {
    return '-';
  }
};

const diceToString = function(dice: Array<Die>): string {
  return dice.slice(0,2).map(function(d) { return dieToString(d); }).join('');
};

const backgammonStateSerializer = function(state: GameState): string {
  let bar = pointToString(state.bar);
  let points = pointsToString(state.points);
  let offBoard = pointToString(state.offBoard);
  let dice = diceToString(state.dice);
  let player = state.currentPlayerNumber;
  return `${bar}${points}${offBoard}${dice}${player}`;
}

export default backgammonStateSerializer

