import backgammonStateSerializer from './backgammonStateSerializer'
import checkersStateSerializer from './checkersStateSerializer'
import chessStateSerializer from './chessStateSerializer'

const stateSerializer = function(game) {
  switch(game) {
    case 'backgammon':
      return backgammonStateSerializer;
      break;
    case 'checkers':
      return checkersStateSerializer;
      break;
    case 'chess':
      return chessStateSerializer;
      break;
    default:
      throw new Error('Invalid Game');
  }
};

export default stateSerializer

