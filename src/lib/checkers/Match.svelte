<script>
  import { browser } from '$app/environment';
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';

  import exists from '$lib/utils/exists';
  import AiService from '$lib/services/AiService';
  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';

  import { touchSquare as matchTouchSquare, winner } from '$lib/checkers/logic/match';

  import PieceImage from '$lib/checkers/PieceImage.svelte';
  import SquareControl from '$lib/checkers/SquareControl.svelte';
  import buildMatchAttributes from '$lib/checkers/logic/buildMatchAttributes';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;

  $: matchState;
  $: notification = matchState.notification;
  $: squaresWithPieces = matchState.gameState.squares.filter((square) => square.piece != null).sort((a, b) => a.piece.id - b.piece.id);

  // state
  function saveState(state) {
    matchState = state;
    if (browser) {
      let data = JSON.stringify(state);
      window.localStorage.setItem("checkers", data);
    }
  };

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('checkers');
      return JSON.parse(data);
    } else {
      return null
    }
  };

  // setup functions
  function setPlayers(state) {
    state.players.forEach((p) => {
      if ( p.name === "Player") {
        playerNumber = p.playerNumber;
      };
      if ( p.name === "Computer") {
        aiPlayerNumber = p.playerNumber;
      };
    });
  };

  function setState(state) {
    setPlayers(state);
    saveState(state);
  };

  function setDefaultState() {
    let state = buildMatchAttributes();
    setState(state);
    if (aiPlayerNumber === 1) {
      setTimeout(aiTurn, 2000);
    }
  };

  function setInitialMatchState() {
    let state = getState();

    if (state !== null) {
      setState(state);
    } else {
      setDefaultState();
    }
  };

  // setup
  setInitialMatchState();

  // ai action functions
  function aiMove(move) {
    move.forEach((leg) => {
      matchTouchSquare(matchState, aiPlayerNumber, leg);
      saveState(matchState);
    });
  };

  function aiTurn() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'checkers';
    aiService.postMove(game, matchState.gameState, (move) => {
      if (exists(move)) {
        let func = () => aiMove(move);
        setTimeout(func, 1500); // delay so that it doesn't move straight after player moves
      }
    }, (_) => {
      if (browser) {
        alert("Something went wrong. Please try again later.");
      }
    });
  };

  // user action functions
  function touchSquare(squareId) {
    matchTouchSquare(matchState, playerNumber, squareId);
    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind
    let winnerPlayerNumber = winner(matchState);

    if (lastActionKind === 'move' && !exists(winnerPlayerNumber)) {
      aiTurn();
    }
  };

  function touchReset() {
    setDefaultState();
  };
</script>

<div class="match checkers_match">
  <div class="checkers_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage square={square} pov={playerNumber} />
    {/each}
    {#each matchState.gameState.squares as square (square.id)}
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

    & {
      width: 100%;
      cursor: pointer;
      background-size: 100% 100%;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iODAwIiB3aWR0aD0iODAwIj4KICA8ZGVmcz4KICAgIDxnIGlkPSJkYXJrX3NxdWFyZSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjA2MDYwIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJvZGRfcm93Ij4KICAgICAgPHVzZSB4PSIxMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIzMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI1MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI3MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KCiAgICA8ZyBpZD0iZXZlbl9yb3ciPgogICAgICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIyMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI0MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI2MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KICA8L2RlZnM+CgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiICBmaWxsPSIjZDBkMGQwIiAvPgoKICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSIyMDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI0MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI2MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+Cjwvc3ZnPgoK);
      position: relative;
    }
  }
</style>

