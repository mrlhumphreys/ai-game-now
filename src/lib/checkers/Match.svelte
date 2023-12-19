<script>
  import { browser } from '$app/environment';
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';
  import jcheckers from '@mrlhumphreys/jcheckers';
  let CheckersMatch = undefined;

  if (browser) {
    CheckersMatch = jcheckers.Match
  } else {
    CheckersMatch = jcheckers.default.Match
  }

  import exists from '$lib/utils/exists';
  import tossCoin from '$lib/utils/tossCoin';
  import AiService from '$lib/services/AiService';
  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';
  import PieceImage from '$lib/checkers/PieceImage.svelte';
  import SquareControl from '$lib/checkers/SquareControl.svelte';
  import buildMatchAttributes from '$lib/checkers/buildMatchAttributes';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;

  $: match = new CheckersMatch(matchState);
  $: notification = match.notification;
  $: squaresWithPieces = matchState.game_state.squares.filter((square) => square.piece != null).sort((a, b) => a.piece.id - b.piece.id);

  // setup functions
  function randomiseFirstPlayer() {
    let result = tossCoin();

    if (result === 0) {
      playerNumber = 1;
      aiPlayerNumber = 2;
    } else {
      playerNumber = 2;
      aiPlayerNumber = 1;
      setTimeout(fetchAndPerformAiMove, 2000);
    }
  }

  function setInitialMatchState() {
    matchState = buildMatchAttributes(playerNumber);
  }

  // setup
  randomiseFirstPlayer();
  setInitialMatchState();

  // ai action functions
  function performAiMove(move) {
    move.forEach((leg) => {
      match.touchSquare(leg, aiPlayerNumber);
    });

    matchState = match.asJson;
  };

  function fetchAndPerformAiMove() {
      let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
      let game = 'checkers';
      aiService.getMove(game, match.gameState.asJson, (move) => {
        if (exists(move)) {
          let func = () => performAiMove(move);
          setTimeout(func, 1500);
        }
      }, (_) => {
        if (browser) {
          alert("Something went wrong. Please try again later.");
        }
      });
  };

  // user action functions
  function touchSquare(squareId) {
    match.touchSquare(squareId, playerNumber);

    matchState = match.asJson;

    let lastActionKind = exists(match.lastAction) && match.lastAction.kind
    let winner = match.gameState.winner;

    if (lastActionKind === 'move' && !exists(winner)) {
      fetchAndPerformAiMove();
    }
  };

  function touchReset() {
    randomiseFirstPlayer();
    setInitialMatchState();
  };
</script>

<div class="match checkers_match">
  <div class="checkers_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage square={square} pov={playerNumber} />
    {/each}
    {#each matchState.game_state.squares as square (square.id)}
      <SquareControl square={square} touchSquare={touchSquare} pov={playerNumber} />
    {/each}
  </div>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/match.scss';

  .checkers_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 620px;
    }
  }

  .checkers_board {
    @media only screen and (max-device-width: 480px) {
      height: 100vw;
    }

    @media only screen and (min-device-width: 481px) {
      height: 620px;
    }

    width: 100%;
    cursor: pointer; 
    background-size: 100% 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iODAwIiB3aWR0aD0iODAwIj4KICA8ZGVmcz4KICAgIDxnIGlkPSJkYXJrX3NxdWFyZSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjA2MDYwIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJvZGRfcm93Ij4KICAgICAgPHVzZSB4PSIxMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIzMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI1MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI3MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KCiAgICA8ZyBpZD0iZXZlbl9yb3ciPgogICAgICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIyMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI0MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI2MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KICA8L2RlZnM+CgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiICBmaWxsPSIjZDBkMGQwIiAvPgoKICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSIyMDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI0MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI2MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+Cjwvc3ZnPgoK);
    position: relative;
  }
</style>

