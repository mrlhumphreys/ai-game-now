import { describe, it, expect  } from 'vitest';
import chessMoveParser from '$lib/services/chessMoveParser';
import fenToGameState from '$lib/chess/logic/fenToGameState';

describe('pawn move', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'c5';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'c2', toId: 'c5', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('double pawn move', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/ppp1pppp/8/8/3Pp3/8/PPP2PPP/RNBQKBNR b KQkq - 0 3';
    let gameState = fenToGameState(fen);
    let move = 'e3';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e4', toId: 'e3', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('pawn capture', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'exd5';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e4', toId: 'd5', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('pawn en passant', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 1';
    let gameState = fenToGameState(fen);
    let move = 'exd6 e.p.'
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e5', toId: 'd6', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('non-pawn move', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/3B4/8/PPPPPPPP/RN1QKBNR w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'Be5';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'd4', toId: 'e5', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('non-pawn capture', () => {
  it('must parse out the details', () => {
    let fen = 'rnbqkbnr/pppp1ppp/8/4p3/3B4/8/PPPPPPPP/RN1QKBNR w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'Bxe5';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'd4', toId: 'e5', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('disambiguation rank', () => {
  it('must parse out the details', () => {
    let fen = '7k/8/R7/8/8/8/8/R6K w - - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'R1a3';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'a1', toId: 'a3', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('disambiguation file', () => {
  it('must parse out the details', () => {
    let fen = 'k2r3r/8/8/8/8/8/8/K b - - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'Rdf8';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'd8', toId: 'f8', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('disambiguation rank and file', () => {
  it('must parse out the details', () => {
    let fen = '1k5K/8/8/8/3Q2Q/8/8/7Q w - - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'Qh4e1';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'h4', toId: 'e1', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('promotion', () => {
  it('must parse out the details', () => {
    let fen = 'k7/4P3/8/8/8/8/8/7K w - - 0 1';
    let gameState = fenToGameState(fen);
    let move = 'e8Q';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e7', toId: 'e8', promotionPieceType: 'queen' };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('player 1 queen side castle', () => {
  it('must parse out the details', () => {
    let fen = 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = '0-0';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e1', toId: 'g1', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('player 1 king side castle', () => {
  it('must parse out the details', () => {
    let fen = 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = '0-0-0';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e1', toId: 'c1', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('player 2 queen side castle', () => {
  it('must parse out the details', () => {
    let fen = 'r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = '0-0';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e8', toId: 'g8', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});

describe('player 2 king side castle', () => {
  it('must parse out the details', () => {
    let fen = 'r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1';
    let gameState = fenToGameState(fen);
    let move = '0-0-0';
    if (gameState !== null) {
      let result = chessMoveParser(move, gameState);
      let expected = { fromId: 'e8', toId: 'c8', promotionPieceType: null };
      expect(result).toEqual(expected);
    } else {
      expect(gameState).not.toBeNull();
    }
  });
});
