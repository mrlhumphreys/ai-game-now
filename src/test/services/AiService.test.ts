import { describe, it, expect, vi } from 'vitest';
import AiService from '$lib/services/AiService';
import buildMatchAttributes from '$lib/checkers/logic/buildMatchAttributes';

// @ts-ignore
global.fetch = vi.fn();

function createFetchResponse(statusCode: number, data: string) {
  return { status: statusCode, text: () => new Promise((resolve) => resolve(data)) }; 
}

describe('post', () => {
  describe('valid response', () => {
    it('should call the callback with move', () => {
      let validResponse = '11-15';
      // @ts-ignore
      fetch.mockResolvedValue(createFetchResponse(200, validResponse));
      let aiService = new AiService("http://127.0.0.1:7878");
      let match = buildMatchAttributes(1);
      let expectedMove = [11, 15];
      aiService.postMove('checkers', match.game_state, (move: Array<number>) => {
        expect(move).toEqual(expectedMove);
      },
      (err: string) => {
        expect(err).toBe(null);
      })
    });
  });
  
  describe('invalid response', () => {
    it('should call the error callback with a message', () => {
      let invalidResponse = '422 Unprocessable Entity';
      // @ts-ignore
      fetch.mockResolvedValue(createFetchResponse(422, invalidResponse));
      let aiService = new AiService("http://127.0.0.1:7878");
      let match = buildMatchAttributes(1);
      let expectedResult = 'INVALID_SERVER_RESPONSE'
      aiService.postMove('checkers', match.game_state, (move: string) => {
        expect(move).toBe(null);
      },
      (err: string) => {
        expect(err).toEqual(expectedResult);
      })
    });
  });
});
