import { describe, it, expect } from 'vitest';
import calculatePieceClassName from '$lib/backgammon/logic/calculatePieceClassName';

describe('pov 1, player 1, point bar, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 'bar', 1);
     expect(result).toEqual('piece position_bar_bottom_1');
  });
});

describe('pov 1, player 1, point bar, pieceIndex 2', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 'bar', 2);
     expect(result).toEqual('piece position_bar_bottom_2');
  });
});

describe('pov 1, player 2, point bar, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 2, 'bar', 1);
     expect(result).toEqual('piece position_bar_top_1');
  });
});

describe('pov 2, player 1, point bar, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(2, 1, 'bar', 1);
     expect(result).toEqual('piece position_bar_top_1');
  });
});

describe('pov 1, player 1, point off board, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 'offBoard', 1);
     expect(result).toEqual('piece position_off_board_right_top_1');
  });
});

describe('pov 1, player 1, point off board, pieceIndex 2', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 'offBoard', 2);
     expect(result).toEqual('piece position_off_board_right_top_2');
  });
});

describe('pov 1, player 2, point off board, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 2, 'offBoard', 1);
     expect(result).toEqual('piece position_off_board_right_bottom_1');
  });
});

describe('pov 2, player 1, point off board, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(2, 1, 'offBoard', 1);
     expect(result).toEqual('piece position_off_board_left_bottom_1');
  });
});

describe('pov 1, player 1, point 1, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 1, 1);
     expect(result).toEqual('piece position_1_1');
  });
});

describe('pov 1, player 1, point 1, pieceIndex 2', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 1, 2);
     expect(result).toEqual('piece position_1_2');
  });
});

describe('pov 1, player 1, point 2, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 1, 2, 1);
     expect(result).toEqual('piece position_2_1');
  });
});

describe('pov 1, player 2, point 1, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(1, 2, 1, 1);
     expect(result).toEqual('piece position_1_1');
  });
});

describe('pov 2, player 1, point 1, pieceIndex 1', () => {
  it('should return class name', () => {
     let result = calculatePieceClassName(2, 1, 1, 1);
     expect(result).toEqual('piece position_13_1');
  });
});
