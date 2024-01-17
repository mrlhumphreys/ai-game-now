import backgammonMoveParser from './backgammonMoveParser'
import checkersMoveParser from './checkersMoveParser'
import chessMoveParser from './chessMoveParser'

const moveParser = function(game: string): Function {
  switch(game) {
    case 'backgammon':
      return backgammonMoveParser;
    case 'checkers':
      return checkersMoveParser;
    case 'chess':
      return chessMoveParser;
    default:
      throw new Error('Invalid Game');
  }
};

export default moveParser

