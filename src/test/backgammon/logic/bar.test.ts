import { describe, it, expect } from 'vitest';
import {
  piecesOwnedByPlayer,
  push,
  hasPiecesOwnedByPlayer,
  noPiecesOwnedByPlayer,
  select,
  deselect,
  pop
} from '$lib/backgammon/logic/bar';

describe('piecesOwnedByPlayer', () => {
  it('returns pieces owned by the player', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = piecesOwnedByPlayer(bar, playerNumber);
    let expected = [ { id: 1, player_number: 1 } ];
    expect(result).toEqual(expected);
  });
});

describe('push', () => {
  it('pushes a piece onto the bar', () => {
    let bar = { name: 'bar', pieces: [ ], selected: false }; 
    let piece = { id: 1, player_number: 1 };
    push(bar, piece);
    expect(bar.pieces).toEqual([piece]);
  });
});

describe('hasPiecesOwnedByPlayer', () => {
  it('must return true if bar has pieces owned by player', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = hasPiecesOwnedByPlayer(bar, playerNumber);
    expect(result).toBe(true);
  });

  it('must return false if bar has no pieces owned by player', () =>{
    let bar = { name: 'bar', pieces: [ { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = hasPiecesOwnedByPlayer(bar, playerNumber);
    expect(result).toBe(false);
  });
});

describe('noPiecesOwnedByPlayer', () => {
  it('must return true if bar has no pieces owned by player', () => {
    let bar = { name: 'bar', pieces: [ { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = noPiecesOwnedByPlayer(bar, playerNumber);
    expect(result).toBe(true);
  });

  it('must return false if bar has pieces owned by player', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: false }; 
    let playerNumber = 1;
    let result = noPiecesOwnedByPlayer(bar, playerNumber);
    expect(result).toBe(false);
  });
});

describe('select', () => {
  it('marks bar as selected', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: false }; 
    select(bar);
    expect(bar.selected).toBe(true);
  });
});

describe('deselect', () => {
  it('unmarks bar as selected', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: true }; 
    deselect(bar);
    expect(bar.selected).toBe(false);
  });
});

describe('pop', () => {
  it('removes and returns the piece owned by the player', () => {
    let bar = { name: 'bar', pieces: [ { id: 1, player_number: 1 }, { id: 2, player_number: 2 } ], selected: true }; 
    let poppedPiece = pop(bar, 1);
    expect(bar.pieces).toEqual([{ id: 2, player_number: 2 }]);
    expect(poppedPiece).toEqual({ id: 1, player_number: 1 });
  });
});
