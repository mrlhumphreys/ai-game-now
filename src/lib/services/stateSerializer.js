import backgammonStateSerializer from './backgammonStateSerializer'
import checkersStateSerializer from './checkersStateSerializer'

const stateSerializer = function(game) {
  switch(game) {
    case 'backgammon':
      return backgammonStateSerializer;
      break;
    case 'checkers':
      return checkersStateSerializer;
      break;
    default:
      throw new Error('Invalid Game');
  }
};

export default stateSerializer

