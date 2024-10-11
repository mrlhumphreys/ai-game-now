<script>
  import exists from '$lib/utils/exists';

  function getPlayerPrisonerCount(playerStats, playerNumber) {
    var ps = playerStats.find(function(p) { return p.playerNumber === playerNumber; });
    if (ps !== undefined) {
      return `${ps.prisonerCount} stones captured`;
    } else {
      return '';
    }
  }

  function getDisplayPassed(playerStats) {
    return playerStats.find(function(ps) { return ps.passed; }) !== undefined;
  }

  function getDisplayScore(playerOneScore, playerTwoScore) {
    return exists(playerOneScore) && exists(playerTwoScore);
  }

  function getPlayerScoreDisplay(playerScore) {
    if (exists(playerScore)) {
      return `${playerScore} points`;
    } else {
      return '-';
    }
  }

  function getPlayerPassedDisplay(playerStats, playerNumber) {
    var ps = playerStats.find(function(p) { return p.playerNumber === playerNumber; });

    if (ps !== undefined && ps.passed) {
      return 'Passed';
    } else {
      return '-';
    }
  }

  export let playerStats;
  export let playerOneScore;
  export let playerTwoScore;

  $: playerStats;
  $: playerOnePrisonerCount = getPlayerPrisonerCount(playerStats, 1);
  $: playerTwoPrisonerCount = getPlayerPrisonerCount(playerStats, 2);
  $: displayScore = getDisplayScore(playerOneScore, playerTwoScore);
  $: displayPassed = getDisplayPassed(playerStats);
  $: playerOneScoreDisplay = getPlayerScoreDisplay(playerOneScore);
  $: playerTwoScoreDisplay = getPlayerScoreDisplay(playerTwoScore);
  $: playerOnePassedDisplay = getPlayerPassedDisplay(playerStats, 1);
  $: playerTwoPassedDisplay = getPlayerPassedDisplay(playerStats, 2);
</script>

<table class="go_player_stats">
  <tbody>
    <tr>
      <td class="go_player_one">{playerOnePrisonerCount}</td>
      <td class="go_player_two">{playerTwoPrisonerCount}</td>
    </tr>
    {#if displayScore}
      <tr>
        <td class="go_player_one">{playerOneScoreDisplay}</td>
        <td class="go_player_two">{playerTwoScoreDisplay}</td>
      </tr>
    {/if}
    {#if displayPassed}
      <tr>
        <td class="go_player_one">{playerOnePassedDisplay}</td>
        <td class="go_player_two">{playerTwoPassedDisplay}</td>
      </tr>
    {/if}
  </tbody>
</table>

<style lang="scss">
  .go_player_stats {
    @import '$lib/styles/colors.scss';

    width: 100%;
    border-top: solid 1px $gray-20;

    .go_player_one {
      color: $gray-90;
      background-color: $gray-20;
    }

    .go_player_two {
      color: $gray-20;
      background-color: $spot-colour;
    }

    td {
      width: 50%;
      padding: 0.5em 0px;
      text-align: center;
    }
  }
</style>
