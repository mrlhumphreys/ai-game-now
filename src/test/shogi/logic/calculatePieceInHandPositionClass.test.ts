import { describe, it, expect } from 'vitest';
import calculatePieceInHandPositionClass from '$lib/shogi/logic/calculatePieceInHandPositionClass';

describe('calculatePieceInHandPositionClass', () => {
  describe('when player is 1 and pov is 1', () => {
    it('returns bottom', () => {
      let piece = { id: 1, type: 'fuhyou', playerNumber: 1, selected: false };
      let pov = 1;
      let result = calculatePieceInHandPositionClass(piece, pov);
      expect(result).toEqual('position_hand_bottom_fuhyou');
    });
  });

  describe('when player is 1 and pov is 2', () => {
    it('returns top', () => {
      let piece = { id: 1, type: 'fuhyou', playerNumber: 2, selected: false };
      let pov = 1;
      let result = calculatePieceInHandPositionClass(piece, pov);
      expect(result).toEqual('position_hand_top_fuhyou');
    });
  });

  describe('when player is 1 and pov is 2', () => {
    it('returns top', () => {
      let piece = { id: 1, type: 'fuhyou', playerNumber: 1, selected: false };
      let pov = 2;
      let result = calculatePieceInHandPositionClass(piece, pov);
      expect(result).toEqual('position_hand_top_fuhyou');
    });
  });

  describe('when player is 2 and pov is 2', () => {
    it('returns bottom', () => {
      let piece = { id: 1, type: 'fuhyou', playerNumber: 2, selected: false };
      let pov = 2;
      let result = calculatePieceInHandPositionClass(piece, pov);
      expect(result).toEqual('position_hand_bottom_fuhyou');
    });
  });
});
