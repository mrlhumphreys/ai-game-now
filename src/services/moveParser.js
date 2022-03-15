import backgammonMoveParser from './backgammonMoveParser'
import checkersMoveParser from './checkersMoveParser'

const moveParser = function(game) {
  switch(game) {
    case 'backgammon':
      return backgammonMoveParser;
      break;
    case 'checkers':
      return checkersMoveParser;
      break;
    default:
      throw new Error('Invalid Game');
  }
};

export default moveParser
