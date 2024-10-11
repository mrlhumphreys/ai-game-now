import type PlayerStat from '$lib/go/interfaces/PlayerStat';

export const markAsPassed = function(playerStat: PlayerStat): boolean {
  playerStat.passed = true;
  return true;
};

export const markAsContinuing = function(playerStat: PlayerStat): boolean {
  playerStat.passed = false;
  return true;
};

export const addToPrisonerCount = function(playerStat: PlayerStat, number: number): number {
  playerStat.prisonerCount += number;
  return playerStat.prisonerCount;
}

