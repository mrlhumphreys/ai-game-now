import type GameState from '$lib/checkers/interfaces/GameState';
import type Square from '$lib/checkers/interfaces/Square';

// B:W21,22,23,24,25,26,27,28,29,30,31,32:B1,2,3,4,6,7,9,10,11,12
// --- W32 --- W31 --- W30 --- W29
// W28 --- W27 --- W26 --- W25 ---

const idToCoordinate = [ 
  { x: -1, y: -1 },

  { x: 6, y: 7 },
  { x: 4, y: 7 },
  { x: 2, y: 7 },
  { x: 0, y: 7 },

  { x: 7, y: 6 },
  { x: 5, y: 6 },
  { x: 3, y: 6 },
  { x: 1, y: 6 },

  { x: 6, y: 5 },
  { x: 4, y: 5 },
  { x: 2, y: 5 },
  { x: 0, y: 5 },

  { x: 7, y: 4 },
  { x: 5, y: 4 },
  { x: 3, y: 4 },
  { x: 1, y: 4 },

  { x: 6, y: 3 },
  { x: 4, y: 3 },
  { x: 2, y: 3 },
  { x: 0, y: 3 },
  
  { x: 7, y: 2 },
  { x: 5, y: 2 },
  { x: 3, y: 2 },
  { x: 1, y: 2 },

  { x: 6, y: 1 },
  { x: 4, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 1 },

  { x: 7, y: 0 },
  { x: 5, y: 0 },
  { x: 3, y: 0 },
  { x: 1, y: 0 }
];

const fenToGameState = function(fen: string): GameState | undefined {
  let parts = fen.split(':');
  if (parts === null || parts[1] === undefined || parts[2] === undefined) {
    return undefined;
  }
  let playerNumberPart = parts[0];
  let playerTwoParts = parts[1].split(',');
  let playerOneParts = parts[2].split(',');

  let playerNumber = 1;
  let squares: Array<Square> = [];

  switch (playerNumberPart) {
    case 'W':
      playerNumber = 2;  
      break;
    case 'B':
      playerNumber = 1;     
      break;
    default:
      return undefined;  
  }

  playerOneParts.forEach(function(e: string, i: number) {
    let matches = e.match(/([W|B|K]*)(\d+)/); 
    if (matches !== null) {
      let letter = matches[1];
      if (matches !== null && matches[2] !== undefined) {
        let number = parseInt(matches[2]);
        let piece = { id: i, player_number: 1, king: (letter === 'K'), selected: false }; 
        let coordinate = idToCoordinate[number];
        if (coordinate !== undefined) {
          let square = { id: number, x: coordinate.x, y: coordinate.y, marked: false, piece: piece }; 
          squares.push(square);   
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  });

  playerTwoParts.forEach(function(e: string, i: number) {
    let matches = e.match(/([W|B|K]*)(\d+)/); 
    if (matches !== null) {
      let letter = matches[1];
      if (matches[2] !== undefined) {
        let number = parseInt(matches[2]);
        let piece = { id: (i + 12), player_number: 2, king: (letter === 'K'), selected: false }; 
        let coordinate = idToCoordinate[number];
        if (coordinate !== undefined) {
          let square = { id: number, x: coordinate.x, y: coordinate.y, marked: false, piece: piece }; 
          squares.push(square);   
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  });

  // find unoccupied squares
  let occupiedSquareIds = squares.map(function(s) { return s.id; });
  let unoccupiedSquareIds = [];

  let counter = 1;

  while (counter <= 32) {
    if (!occupiedSquareIds.includes(counter)) {
      let coordinate = idToCoordinate[counter];
      if (coordinate !== undefined) {
        let square = { id: counter, x: coordinate.x, y: coordinate.y, marked: false, piece: null };
        squares.push(square);
      } else {
        return undefined;
      }
    }
    counter += 1;
  }

  return {
    current_player_number: playerNumber,
    squares: squares.sort(function(a, b) { return a.id - b.id; })
  };
};

export default fenToGameState
