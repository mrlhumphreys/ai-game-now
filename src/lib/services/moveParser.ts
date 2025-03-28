import backgammonMoveParser from './backgammonMoveParser'
import checkersMoveParser from './checkersMoveParser'
import chessMoveParser from './chessMoveParser'
import goMoveParser from './goMoveParser'
import shogiMoveParser from './shogiMoveParser'

const moveParser = function(game: string): Function {
  switch(game) {
    case 'backgammon':
      return backgammonMoveParser;
    case 'checkers':
      return checkersMoveParser;
    case 'chess':
      return chessMoveParser;
    case 'go':
      return goMoveParser;
    case 'shogi':
      return shogiMoveParser;
    default:
      throw new Error('Invalid Game');
  }
};

export default moveParser

