import DEFAULT_MATCH_ATTRIBUTES from '$lib/chess/DEFAULT_MATCH_ATTRIBUTES';

const buildMatchAttributes = function(playerNumber) {
  let matchAttributes = DEFAULT_MATCH_ATTRIBUTES;

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
    { player_number: 1, name: playerOneName },
    { player_number: 2, name: playerTwoName }
  ];
  matchAttributes.notification = `${playerOneName} to move`;

  return matchAttributes;
};

export default buildMatchAttributes 

