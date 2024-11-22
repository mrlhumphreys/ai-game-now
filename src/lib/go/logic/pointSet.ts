import type Point from '$lib/go/interfaces/Point';
import type Stone from '$lib/go/interfaces/Stone';

import compact from '$lib/utils/compact';
import exists from '$lib/utils/exists';
import max from '$lib/utils/max';
import min from '$lib/utils/min';
import reject from '$lib/utils/reject';
import uniq from '$lib/utils/uniq';
import {
  playerNumber as pointSetPlayerNumber
} from '$lib/go/logic/pointSet';
import {
  occupied as pointOccupied,
  unoccupied as pointUnoccupied,
  occupiedBy as pointOccupiedBy,
  occupiedByOpponent as pointOccupiedByOpponent,
  captureStone,
  place as pointPlace,
  clearTerritory,
  unmarked,
  addToTerritory
} from '$lib/go/logic/point';
import {
  joinChain
} from '$lib/go/logic/stone';
import {
  orthogonal,
  magnitude
} from '$lib/go/logic/vector';

export const includes = function(points: Array<Point>, point: Point): boolean {
  return points.find(function(p) {
    return p.id === point.id;
  }) !== undefined;
};

export const playerNumber = function(points: Array<Point>): number | null {
  let point = points[0];
  if (point !== undefined && point.stone !== null) {
    return point.stone.playerNumber;
  } else {
    return null;
  }
};

export const findById = function(points: Array<Point>, pointId: string): Point | undefined {
  return points.find(function(p: Point) {
    return p.id == pointId;
  });
};

export const occupied = function(points: Array<Point>): Array<Point> {
  return points.filter(function(p) {
    return pointOccupied(p);
  });
};

export const unoccupied = function(points: Array<Point>): Array<Point> {
  return points.filter(function(p) {
    return pointUnoccupied(p);
  });
};

export const occupiedBy = function(points: Array<Point>, playerNumber: number): Array<Point> {
  return points.filter(function(p) {
    return pointOccupiedBy(p, playerNumber);
  });
};

export const occupiedByOpponent = function(points: Array<Point>, playerNumber: number): Array<Point> {
  return points.filter(function(p) {
    return pointOccupiedByOpponent(p, playerNumber);
  });
};

export const adjacent = function(points: Array<Point>, pointOrGroup: Point | Array<Point>): Array<Point> {
  if (Array.isArray(pointOrGroup)) {
      return pointOrGroup.map((p: Point) => {
        return adjacent(points, p);
      }).flat().filter(function(p: Point) {
        return !pointOrGroup.includes(p);
      }).filter(function(p: Point, i: number, a: Array<Point>) {
        return a.indexOf(p) === i;
      });
  } else {
    return points.filter(function(p: Point) {
      return (orthogonal(pointOrGroup, p) && magnitude(pointOrGroup, p) === 1);
    });
  }
}

export const chains = function(points: Array<Point>, chainIds: Array<number> | null = null): Array<Array<Point>> {
  if (chainIds !== null) {
    return chainIds.map((cId) => {
      return points.filter(function(p) {
        if (p.stone !== null) {
          return p.stone.chainId === cId;
        } else {
          return false;
        }
      });
    });
  } else {
    let allChainIds = uniq(points.filter(function(p) {
      return exists(p.stone);
    }).map(function(p) {
      if (p.stone !== null) {
        return p.stone.chainId;
      } else {
        return 0;
      }
    }));
    return chains(points, allChainIds);
  }
};

export const territories = function(points: Array<Point>, territoryIds: Array<number> | null = null): Array<Array<Point>> {
  if (territoryIds !== null) {
    return territoryIds.map((tId) => {
      return points.filter(function(p) {
        return p.territoryId === tId;
      });
    });
  } else {
    let allTerritoryIds = uniq(points.filter(function(p) {
      return exists(p.territoryId);
    }).map(function(p) {
      if (p.territoryId !== null) {
        return p.territoryId;
      } else {
        return 0;
      }
    }));
    return territories(points, allTerritoryIds);
  }
};

export const territoriesFor = function(points: Array<Point>, playerNumber: number): Array<Array<Point>> {
  return territories(points).filter((t) => {
    return adjacent(points, t).every(function(p) {
      return pointOccupiedBy(p, playerNumber);
    });
  });
};

export const libertiesFor = function(points: Array<Point>, pointOrChain: Array<Point> | Point): number {
  return unoccupied(adjacent(points, pointOrChain)).length;
};

export const surroundedByEnemies = function(points: Array<Point>, point: Point, playerNumber: number): boolean {
    let adj = adjacent(points, point);
    return adj.every(function(p) { return p.stone !== null && p.stone.playerNumber !== playerNumber; });
};

// deprives last liberty of player's stones
export const deprivesLiberties = function(points: Array<Point>, point: Point, playerNumber: number): boolean {
  let chainIds: Array<number> = [];
  occupiedBy(adjacent(points, point), playerNumber).forEach(function(p) {
    if (p.stone !== null) {
      chainIds.push(p.stone.chainId);
    }
  });
  let thisChains = chains(points, uniq(chainIds));
  if (thisChains.length === 0) {
    return false;
  } else {
    return thisChains.every((c) => { return libertiesFor(points, c) === 1; });
  }
};

// deprives last liberty of opponents stone
export const deprivesOpponentsLiberties = function(points: Array<Point>, point: Point, playerNumber: number): boolean {
  let chainIds: Array<number> = [];
  occupiedByOpponent(adjacent(points, point), playerNumber).forEach(function(p) {
    if (p.stone !== null) {
      chainIds.push(p.stone.chainId);
    }
  });
  let thisChains = chains(points, uniq(chainIds));
  return thisChains.some((c) => { return libertiesFor(points, c) === 1; });
};

export const updateJoinedChains = function(points: Array<Point>, pointId: string, playerNumber: number): boolean {
  let point = findById(points, pointId);
  if (point !== undefined) {
    let existingChainIds: Array<number> = [];
    occupiedBy(adjacent(points, point), playerNumber).forEach(function(p) {
      if (p.stone !== null) {
        existingChainIds.push(p.stone.chainId);
      }
    });

    let existingChains = chains(points, uniq(existingChainIds));
    existingChains.forEach(function(c) {
      c.forEach(function(p) {
        if (p.stone !== null && point !== undefined && point.stone !== null) {
          joinChain(p.stone, point.stone);
        }
      });
    });
    return true;
  } else {
    return false;
  }
};

export const captureStones = function(points: Array<Point>, playerNumber: number): number {
  let stoneCount = 0;

  chains(points).filter((c) => {
    return pointSetPlayerNumber(c) !== playerNumber && libertiesFor(points, c) === 0;
  }).forEach(function(c) {
    c.forEach(function(p) {
      captureStone(p);
      stoneCount += 1;
    });
  });

  return stoneCount;
};

export const minify = function(points: Array<Point>): string {
  return points.map(function(p) {
    let playerNumber = 0;
    if (p.stone !== null) {
      playerNumber = p.stone.playerNumber;
    }
    return playerNumber ? String(playerNumber) : '-';
  }).join('');
};

export const place = function(points: Array<Point>, pointId: string, stone: Stone): boolean {
  let point = findById(points, pointId);
  if (point !== undefined) {
    return pointPlace(point, stone);
  } else {
    return false;
  }
};

export const nextStoneId = function(points: Array<Point>): number {
  let maxId = max(occupied(points).map(function(p) {
    if (p.stone !== null) {
      return p.stone.id;
    } else {
      return 0;
    }
  }));
  if (maxId !== undefined) {
    return maxId + 1;
  } else {
    return 1;
  }
};

export const adjacentChainId = function(points: Array<Point>, point: Point, playerNumber: number): number | undefined {
  let chainId = occupiedBy(adjacent(points, point), playerNumber).map(function(p) {
    if (p.stone !== null) {
      return p.stone.chainId;
    } else {
      return undefined;
    }
  })[0];
  return chainId;
};

export const nextChainId = function(points: Array<Point>): number {
  let maxId = max(occupied(points).map(function(p) {
    if (p.stone !== null) {
      return p.stone.chainId;
    } else {
      return 0;
    }
  }));
  if (maxId !== undefined) {
    return maxId + 1;
  } else {
    return 1;
  }
};

export const buildStone = function(points: Array<Point>, point: Point, playerNumber: number): Stone {
  let chainId = adjacentChainId(points, point, playerNumber);
  return {
    id: nextStoneId(points),
    playerNumber: playerNumber,
    chainId: chainId !== undefined ? chainId : nextChainId(points)
  };
};

export const performMove = function(points: Array<Point>, point: Point, playerNumber: number): number {
  let stone = buildStone(points, point, playerNumber);
  place(points, point.id, stone);
  updateJoinedChains(points, point.id, playerNumber);
  return captureStones(points, playerNumber);
};

export const markTerritories = function(points: Array<Point>): boolean {
  points.forEach(function(point) {
    clearTerritory(point);
  });
  points.forEach((point) => {
    if (pointUnoccupied(point) && unmarked(point)) {
      let territoryIds = uniq(compact(unoccupied(adjacent(points, point)).map(function(p) {
        return p.territoryId;
      })));
      let addTerritoryId = undefined;
      switch(territoryIds.length) {
        case 0:
          let maxId = max(compact(points.map(function(p) {
            return p.territoryId;
          })));
          if (maxId !== undefined) {
            addTerritoryId = maxId + 1;
          } else {
            addTerritoryId = 1;
          }
          break;
        case 1:
          addTerritoryId = territoryIds[0];
          break;
        default:
          let minTerritoryId = min(territoryIds);
          let otherTerritoryIds = reject(territoryIds, function(p) {
            return p === minTerritoryId;
          });
          let otherPoints = points.filter(function(p) {
            return p.territoryId !== null && otherTerritoryIds.includes(p.territoryId);
          });
          otherPoints.forEach(function(otherPoint) {
            if (minTerritoryId !== null) {
              addToTerritory(otherPoint, minTerritoryId);
            }
          });
          addTerritoryId = minTerritoryId;
      }

      if (addTerritoryId !== undefined && addTerritoryId !== null) {
        addToTerritory(point, addTerritoryId);
      }
    }
  });
  return true;
};

