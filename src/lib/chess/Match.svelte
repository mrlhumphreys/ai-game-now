<script>
  // bug: clear notification after valid moves?
  // bug: pawn capture promote doesn't promote
  // bug: add winner message
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';

  import exists from '$lib/utils/exists';
  import tossCoin from '$lib/utils/tossCoin';
  import AiService from '$lib/services/AiService';
  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';

  import {
    touchSquare as matchTouchSquare,
    touchPromotionPiece as matchTouchPromotionPiece,
    winner
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
    matchTouchSquare(matchState, aiPlayerNumber, move.fromId);
    matchTouchSquare(matchState, aiPlayerNumber, move.toId);
    if (exists(move.promotionPieceType)) {
      matchTouchPromotionPiece(matchState, aiPlayerNumber, move.promotionPieceType);
    }

    matchState = matchState;
  };

  function fetchAndPerformAiMove() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'chess';
    aiService.postMove(game, matchState.game_state, (move) => {
      if (exists(move)) {
        let func = () => performAiMove(move);
        setTimeout(func, 1500);
      }
    }, (_) => {
      alert("Something went wrong. Please try again later.");
    });
  };

  // user action functions
  function touchSquare(squareId) {
    matchTouchSquare(matchState, playerNumber, squareId);

    matchState = matchState;

    let lastActionKind = exists(matchState.last_action) && matchState.last_action.kind
    let winnerPlayerNumber = winner(matchState);

    if (lastActionKind === 'move' && !exists(winnerPlayerNumber)) {
      fetchAndPerformAiMove();
    }
  };

  function touchPromotionPiece(pieceType) {
    matchTouchPromotionPiece(matchState, playerNumber, pieceType);

    matchState = matchState;

    let lastActionKind = exists(matchState.last_action) && match.last_action.kind
    let winnerPlayerNumber = winner(matchState);

    if (lastActionKind === 'move' && !exists(winnerPlayerNumber)) {
      fetchAndPerformAiMove();
    }
  }
  
  function touchReset() {
    randomiseFirstPlayer();
    setInitialMatchState();
  };
</script>

<div class="match chess_match">
  <div class="chess_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage square={square} pov={playerNumber} />
    {/each}
    {#each matchState.game_state.squares as square (square.id)}
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

    width: 100%;
    cursor: pointer; 
    background-size: 100% 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iODAwIiB3aWR0aD0iODAwIj4KICA8ZGVmcz4KICAgIDxnIGlkPSJkYXJrX3NxdWFyZSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNjA2MDYwIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJvZGRfcm93Ij4KICAgICAgPHVzZSB4PSIxMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIzMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI1MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI3MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KCiAgICA8ZyBpZD0iZXZlbl9yb3ciPgogICAgICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSIyMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI0MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgICAgPHVzZSB4PSI2MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNkYXJrX3NxdWFyZSIgLz4KICAgIDwvZz4KICA8L2RlZnM+CgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiICBmaWxsPSIjZDBkMGQwIiAvPgoKICA8dXNlIHg9IjAiIHk9IjAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSIyMDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iMzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI0MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNTAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+CiAgPHVzZSB4PSIwIiB5PSI2MDAiIHhsaW5rOmhyZWY9IiNvZGRfcm93IiAvPgogIDx1c2UgeD0iMCIgeT0iNzAwIiB4bGluazpocmVmPSIjZXZlbl9yb3ciIC8+Cjwvc3ZnPgoK);
    position: relative;
  }
</style>
