import backgammonStateSerializer from './backgammonStateSerializer'
import checkersStateSerializer from './checkersStateSerializer'
import chessStateSerializer from './chessStateSerializer'
import goStateSerializer from './goStateSerializer'
import shogiStateSerializer from './shogiStateSerializer'

const stateSerializer = function(game: string) {
  switch(game) {
    case 'backgammon':
      return backgammonStateSerializer;
    case 'checkers':
      return checkersStateSerializer;
    case 'chess':
      return chessStateSerializer;
    case 'go':
      return goStateSerializer;
    case 'shogi':
      return shogiStateSerializer;
    default:
      throw new Error('Invalid Game');
  }
};

export default stateSerializer

