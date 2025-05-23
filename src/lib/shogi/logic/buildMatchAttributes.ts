import type Match from '$lib/shogi/interfaces/Match';
import DEFAULT_MATCH_ATTRIBUTES from '$lib/shogi/logic/DEFAULT_MATCH_ATTRIBUTES';
import tossCoin from '$lib/utils/tossCoin';
import deepClone from '$lib/utils/deepClone';

const buildMatchAttributes = function(playerNumber?: number): Match {
  let matchAttributes = deepClone(DEFAULT_MATCH_ATTRIBUTES);

  let playerOneName = undefined;
  let playerTwoName = undefined;

  let result = 0;

  if (playerNumber !== undefined) {
    result = playerNumber === 1 ? 0 : 1;
  } else {
    result = tossCoin();
  }

  if (result === 0) {
    playerOneName = 'Player';
    playerTwoName = 'Computer';
  } else {
    playerOneName = 'Computer';
    playerTwoName = 'Player';
  }

  matchAttributes.players = [
    { playerNumber: 1, name: playerOneName, resigned: false },
    { playerNumber: 2, name: playerTwoName, resigned: false }
  ];

  matchAttributes.notification = `${playerOneName} to move`;

  return matchAttributes;
};

export default buildMatchAttributes
