import backgammonStateSerializer from './backgammonStateSerializer'
import checkersStateSerializer from './checkersStateSerializer'
import chessStateSerializer from './chessStateSerializer'

const stateSerializer = function(game: string) {
  switch(game) {
    case 'backgammon':
      return backgammonStateSerializer;
    case 'checkers':
      return checkersStateSerializer;
    case 'chess':
      return chessStateSerializer;
    default:
      throw new Error('Invalid Game');
  }
};

export default stateSerializer

