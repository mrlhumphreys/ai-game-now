<script>
  import { browser } from '$app/environment';
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';

  import exists from '$lib/utils/exists';
  import tossCoin from '$lib/utils/tossCoin';
  import AiService from '$lib/services/AiService';
  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';

  import {
    touchSquare as matchTouchSquare,
    touchPromotionPiece as matchTouchPromotionPiece,
    gameOver
  } from '$lib/chess/logic/match';

  import PieceImage from '$lib/chess/PieceImage.svelte';
  import SquareControl from '$lib/chess/SquareControl.svelte';
  import PromotionSelect from '$lib/chess/PromotionSelect.svelte';
  import buildMatchAttributes from '$lib/chess/logic/buildMatchAttributes';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;

  $: matchState;
  $: notification = matchState.notification;
  $: promotion = matchState.promotion;
  $: squaresWithPieces = matchState.gameState.squares.filter((square) => square.piece != null).sort((a, b) => a.piece.id - b.piece.id);

  // state
  function saveState(state) {
    matchState = state;
    if (browser) {
      let data = JSON.stringify(state);
      window.localStorage.setItem('chess', data);
    }
  };

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('chess');
      return JSON.parse(data);
    } else {
      return null;
    }
  }

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
    matchTouchSquare(matchState, aiPlayerNumber, move.fromId);
    matchTouchSquare(matchState, aiPlayerNumber, move.toId);
    if (exists(move.promotionPieceType)) {
      matchTouchPromotionPiece(matchState, aiPlayerNumber, move.promotionPieceType);
    }

    saveState(matchState);
  };

  function aiTurn() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'chess';
    aiService.postMove(game, matchState.gameState, (move) => {
      if (exists(move)) {
        let func = () => aiMove(move);
        setTimeout(func, 1500);
      }
    }, (_) => {
      // alert("Something went wrong. Please try again later.");
    });
  };

  // user action functions
  function touchSquare(squareId) {
    matchTouchSquare(matchState, playerNumber, squareId);

    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind

    if (lastActionKind === 'move' && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchPromotionPiece(pieceType) {
    matchTouchPromotionPiece(matchState, playerNumber, pieceType);

    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind

    if (lastActionKind === 'move' && !gameOver(matchState)) {
      aiTurn();
    }
  }

  function touchReset() {
    setDefaultState();
  };
</script>

<div class="match chess_match">
  <div class="chess_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage square={square} pov={playerNumber} />
    {/each}
    {#each matchState.gameState.squares as square (square.id)}
      <SquareControl square={square} touchSquare={touchSquare} pov={playerNumber} />
    {/each}
    <PromotionSelect touchPromotionPiece={touchPromotionPiece} display={promotion} />
  </div>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/match.scss';

  .chess_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 620px;
    }
  }

  .chess_board {
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
