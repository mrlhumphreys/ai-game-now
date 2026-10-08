import { describe, it, expect  } from 'vitest';
import xiangqiMoveParser from '#lib/services/xiangqiMoveParser';
import fenToGameState from '#lib/xiangqi/logic/fenToGameState';

describe('move', () => {
  it('parses the correct details - piece', () => {
    let move = 'E7+9';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '710', toId: '98' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });

  it('parses the correct details - soldier', () => {
    let move = 'P9+1';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '97', toId: '96' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('2 pieces in the same file', () => {
  it('parses the correct details', () => {
    let move = 'R++2';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/R1P1P1P1P/1C5C1/9/RHEAKAEH1 w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '97', toId: '95' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });

  it('parses the correct details - advisor', () => {
    let move = 'A-+5';
    let gameState = fenToGameState('3a1k3/6P2/3a5/9/3R5/9/4P3P/2H1C4/4A4/R1EAK1E2 b - - 2 29');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '61', toId: '52' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('3 soldiers in the same file', () => {
  it('parses the correct details', () => {
    let move = '19+1';
    let gameState = fenToGameState('rheakaehr/9/Pc5c1/2p1p1p1p/P8/9/P1P1P4/1C5C1/9/RHEAKAEHR w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '93', toId: '92' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('moving forward', () => {
  it('parses the correct details', () => {
    let move = 'R1+2';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P2/1C6R/9/RHEAKAEH1 w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '18', toId: '16' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('moving backwards', () => {
  it('parses the correct details', () => {
    let move = 'R1-2';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P2/1C6R/9/RHEAKAEH1 w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '18', toId: '110' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('moving sideways', () => {
  it('parses the correct details', () => {
    let move = 'R1=3';
    let gameState = fenToGameState('rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P2/1C6R/9/RHEAKAEH1 w - - 0 0');
    if (gameState !== null) {
      let result = xiangqiMoveParser(move, gameState);
      let expected = { fromId: '18', toId: '38' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});
