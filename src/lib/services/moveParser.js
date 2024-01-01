import backgammonMoveParser from './backgammonMoveParser'
import checkersMoveParser from './checkersMoveParser'
import chessMoveParser from './chessMoveParser'

const moveParser = function(game) {
  switch(game) {
    case 'backgammon':
      return backgammonMoveParser;
      break;
    case 'checkers':
      return checkersMoveParser;
      break;
    case 'chess':
      return chessMoveParser;
      break;
    default:
      throw new Error('Invalid Game');
  }
};

export default moveParser

