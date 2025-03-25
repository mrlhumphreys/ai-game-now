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
    touchPromotionOption as matchTouchPromotionOption,
    touchPieceInHand as matchTouchPieceInHand,
    gameOver
  } from '$lib/shogi/logic/match';

  import PieceImage from '$lib/shogi/PieceImage.svelte';
  import SquareControl from '$lib/shogi/SquareControl.svelte';
  import PromotionSelect from '$lib/shogi/PromotionSelect.svelte';
  import PieceInHandControl from '$lib/shogi/PieceInHandControl.svelte';
  import buildMatchAttributes from '$lib/shogi/logic/buildMatchAttributes';
  import piecesWithContext from '$lib/shogi/logic/piecesWithContext';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;

  $: matchState;
  $: notification = matchState.notification;
  $: promotion = matchState.promotion;
  $: pieces = piecesWithContext(matchState.gameState);

  // state
  function saveState(state) {
    matchState = state;
    if (browser) {
      let data = JSON.stringify(state);
      window.localStorage.setItem('shogi', data);
    }
  };

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('shogi');
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
    if (move.kind === 'drop') {
      matchTouchPieceInHand(matchState, aiPlayerNumber, move.pieceId);
    } else {
      matchTouchSquare(matchState, aiPlayerNumber, move.fromId);
    }

    matchTouchSquare(matchState, aiPlayerNumber, move.toId);

    if (move.promotionPossible) {
      matchTouchPromotionOption(matchState, aiPlayerNumber, move.promotionAccepted);
    }

    saveState(matchState);
  };

  function aiTurn() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'shogi';
    aiService.postMove(game, matchState.gameState, (move) => {
      if (exists(move)) {
        let func = () => aiMove(move);
        setTimeout(func, 1500);
      } else {
        console.log('move does not exist');
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

    if ((lastActionKind === 'move' || lastActionKind === 'drop') && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchPromotionOption(option) {
    matchTouchPromotionOption(matchState, playerNumber, option);

    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind

    if (lastActionKind === 'move' && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchPieceInHand(pieceId) {
    matchTouchPieceInHand(matchState, playerNumber, pieceId);

    saveState(matchState);
  };

  function touchReset() {
    setDefaultState();
  };
</script>

<div class="match shogi_match">
  <div class="shogi_board">
    {#each pieces as pieceWithContext (pieceWithContext.piece.id)}
      <PieceImage piece={pieceWithContext.piece} pov={playerNumber} context={pieceWithContext.context} square={pieceWithContext.square} />
      {#if pieceWithContext.context === 'hand'}
        <PieceInHandControl piece={pieceWithContext.piece} touchPieceInHand={touchPieceInHand} pov={playerNumber} />
      {/if}
    {/each}
    {#each matchState.gameState.squares as square (square.id)}
      <SquareControl square={square} touchSquare={touchSquare} pov={playerNumber} />
    {/each}
    <PromotionSelect display={promotion} touchPromotionOption={touchPromotionOption} />
  </div>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/match.scss';

  .shogi_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 584px;
    }
  }

  .shogi_board {
    @media only screen and (max-device-width: 480px) {
      height: 130vw;
    }

    @media only screen and (min-device-width: 481px) {
      height: 760px;
    }

    & {
      width: 100%;
      cursor: pointer;
      background-size: 100% 100%;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iMTMwMCIgd2lkdGg9IjEwMDAiPgoKICA8ZGVmcz4KICAgIDxnIGlkPSJ2ZXJ0aWNhbF9saW5lIj4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9Ijk4MSIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgIDwvZz4KCiAgICA8ZyBpZD0iaG9yaXpvbnRhbF9saW5lIj4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iOTAwIiB5Mj0iMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgIDwvZz4KCiAgICA8ZyBpZD0iZG90Ij4KICAgICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjUiIGZpbGw9IiM2MDYwNjAiIC8+CiAgICA8L2c+CiAgPC9kZWZzPgogIAogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiICBmaWxsPSIjZDBkMGQwIiAvPgogIAogIDxsaW5lIHgxPSIwIiB5MT0iMTA5IiB4Mj0iMTAwMCIgeTI9IjEwOSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICA8bGluZSB4MT0iMCIgeTE9IjExOTEiIHgyPSIxMDAwIiB5Mj0iMTE5MSIgc3Ryb2tlPSIjMzAzMDMwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KCiAgPHVzZSB4PSI1MCIgeT0iMTYzLjUiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgogIDx1c2UgeD0iMTUwIiB5PSIxNjMuNSIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIyNTAiIHk9IjE2My41IiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjM1MCIgeT0iMTYzLjUiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgogIDx1c2UgeD0iNDUwIiB5PSIxNjMuNSIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CgogIDx1c2UgeD0iNTUwIiB5PSIxNjMuNSIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI2NTAiIHk9IjE2My41IiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9Ijc1MCIgeT0iMTYzLjUiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgogIDx1c2UgeD0iODUwIiB5PSIxNjMuNSIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI5NTAiIHk9IjE2My41IiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KCiAgPHVzZSB4PSI1MCIgeT0iMTYzLjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSI1MCIgeT0iMjcyLjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSI1MCIgeT0iMzgxLjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSI1MCIgeT0iNDkwLjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSI1MCIgeT0iNTk5LjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CgogIDx1c2UgeD0iNTAiIHk9IjcwOC41IiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iNTAiIHk9IjgxNy41IiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iNTAiIHk9IjkyNi41IiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iNTAiIHk9IjEwMzUuNSIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjUwIiB5PSIxMTQ0LjUiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CgogIDx1c2UgeD0iMzUwIiB5PSI0OTAuNSIgeGxpbms6aHJlZj0iI2RvdCIgLz4KICA8dXNlIHg9IjM1MCIgeT0iODE3LjUiIHhsaW5rOmhyZWY9IiNkb3QiIC8+CiAgPHVzZSB4PSI2NTAiIHk9IjQ5MC41IiB4bGluazpocmVmPSIjZG90IiAvPgogIDx1c2UgeD0iNjUwIiB5PSI4MTcuNSIgeGxpbms6aHJlZj0iI2RvdCIgLz4KPC9zdmc+Cg==);
      position: relative;
    }
  }
</style>
