import backgammonMoveParser from './backgammonMoveParser'
import checkersMoveParser from './checkersMoveParser'
import chessMoveParser from './chessMoveParser'
import goMoveParser from './goMoveParser'
import shogiMoveParser from './shogiMoveParser'
import xiangqiMoveParser from './xiangqiMoveParser'

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
    case 'xiangqi':
      return xiangqiMoveParser;
    default:
      throw new Error('Invalid Game');
  }
};

export default moveParser

