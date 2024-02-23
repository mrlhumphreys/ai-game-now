import type Match from '$lib/backgammon/interfaces/Match';
import DEFAULT_MATCH_ATTRIBUTES from '$lib/backgammon/logic/DEFAULT_MATCH_ATTRIBUTES';
import deepClone from '$lib/utils/deepClone';

const buildMatchAttributes = function(playerNumber: number): Match {
  let matchAttributes = deepClone(DEFAULT_MATCH_ATTRIBUTES);

  let playerOneName = undefined;
  let playerTwoName = undefined;

  if (playerNumber === 1) {
    playerOneName = 'Player';
    playerTwoName = 'Computer';
  } else {
    playerOneName = 'Computer';
    playerTwoName = 'Player';
  }

  matchAttributes.players = [
    { player_number: 1, name: playerOneName, resigned: false },
    { player_number: 2, name: playerTwoName, resigned: false }
  ];
  matchAttributes.notification = `${playerOneName} to roll dice`;

  return matchAttributes;
};

export default buildMatchAttributes 

