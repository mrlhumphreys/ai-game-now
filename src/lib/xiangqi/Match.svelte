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
    gameOver
  } from '$lib/xiangqi/logic/match';

  import PieceImage from '$lib/xiangqi/PieceImage.svelte';
  import SquareControl from '$lib/xiangqi/SquareControl.svelte';
  import buildMatchAttributes from '$lib/xiangqi/logic/buildMatchAttributes';

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
      window.localStorage.setItem('xiangqi', data);
    }
  };

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('xiangqi');
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

    saveState(matchState);
  };

  function aiTurn() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'xiangqi';
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

    if ((lastActionKind === 'move') && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchReset() {
    setDefaultState();
  };
</script>

<div class="match xiangqi_match">
  <div class="xiangqi_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage piece={square.piece} pov={playerNumber} square={square} />
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

  .xiangqi_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 620px;
    }
  }

  .xiangqi_board {
    @media only screen and (max-device-width: 480px) {
      height: 110vw;
    }

    @media only screen and (min-device-width: 481px) {
      height: 682px;
    }

    & {
      width: 100%;
      cursor: pointer;
      background-size: 100% 100%;
      background-image: url(data:image/svg+xml;base64,PCEtLSBzcXVhcmVzIHdpZHRoIDogMSA4IDEsIDEwICAtLT4KPCEtLSBzcXVhcmVzIGhlaWdodCA6IDEgNCAxIDQgMSwgMTEgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxMTAwIiB3aWR0aD0iMTAwMCI+CgogIDxkZWZzPgogICAgPGcgaWQ9InZlcnRpY2FsX2xpbmUiPgogICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iNDAwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJob3Jpem9udGFsX2xpbmUiPgogICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSI4MDAiIHkyPSIwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJjcm9zcyI+CiAgICAgIDxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjIwMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIyMDAiIHgyPSIyMDAiIHkyPSIwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJtYXJrZXIiPgogICAgICA8bGluZSB4MT0iMTAiIHkxPSIwIiB4Mj0iMTAiIHkyPSIxMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMCIgeDI9IjMwIiB5Mj0iMTAiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIycHgiIC8+CgogICAgICA8bGluZSB4MT0iMCIgeTE9IjEwIiB4Mj0iMTAiIHkyPSIxMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMTAiIHgyPSI0MCIgeTI9IjEwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgoKICAgICAgPGxpbmUgeDE9IjAiIHkxPSIzMCIgeDI9IjEwIiB5Mj0iMzAiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIycHgiIC8+CiAgICAgIDxsaW5lIHgxPSIzMCIgeTE9IjMwIiB4Mj0iNDAiIHkyPSIzMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KCiAgICAgIDxsaW5lIHgxPSIxMCIgeTE9IjMwIiB4Mj0iMTAiIHkyPSI0MCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMzAiIHgyPSIzMCIgeTI9IjQwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJsZWZ0X21hcmtlciI+CiAgICAgIDxsaW5lIHgxPSIzMCIgeTE9IjAiIHgyPSIzMCIgeTI9IjEwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgoKICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMTAiIHgyPSI0MCIgeTI9IjEwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgoKICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMzAiIHgyPSI0MCIgeTI9IjMwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgoKICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iMzAiIHgyPSIzMCIgeTI9IjQwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJyaWdodF9tYXJrZXIiPgogICAgICA8bGluZSB4MT0iMTAiIHkxPSIwIiB4Mj0iMTAiIHkyPSIxMCIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjJweCIgLz4KCiAgICAgIDxsaW5lIHgxPSIwIiB5MT0iMTAiIHgyPSIxMCIgeTI9IjEwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iMnB4IiAvPgoKICAgICAgPGxpbmUgeDE9IjAiIHkxPSIzMCIgeDI9IjEwIiB5Mj0iMzAiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIycHgiIC8+CgogICAgICA8bGluZSB4MT0iMTAiIHkxPSIzMCIgeDI9IjEwIiB5Mj0iNDAiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIycHgiIC8+CiAgICA8L2c+CiAgPC9kZWZzPgogIAogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkMGQwZDAiIC8+CgogIDx1c2UgeD0iNDAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiNjcm9zcyIgLz4KICA8dXNlIHg9IjQwMCIgeT0iODAwIiB4bGluazpocmVmPSIjY3Jvc3MiIC8+CgogIDx1c2UgeD0iMTgwIiB5PSIyODAiIHhsaW5rOmhyZWY9IiNtYXJrZXIiIC8+CiAgPHVzZSB4PSI3ODAiIHk9IjI4MCIgeGxpbms6aHJlZj0iI21hcmtlciIgLz4KCiAgPHVzZSB4PSI4MCIgeT0iMzgwIiB4bGluazpocmVmPSIjbGVmdF9tYXJrZXIiIC8+CiAgPHVzZSB4PSIyODAiIHk9IjM4MCIgeGxpbms6aHJlZj0iI21hcmtlciIgLz4KICA8dXNlIHg9IjQ4MCIgeT0iMzgwIiB4bGluazpocmVmPSIjbWFya2VyIiAvPgogIDx1c2UgeD0iNjgwIiB5PSIzODAiIHhsaW5rOmhyZWY9IiNtYXJrZXIiIC8+CiAgPHVzZSB4PSI4ODAiIHk9IjM4MCIgeGxpbms6aHJlZj0iI3JpZ2h0X21hcmtlciIgLz4KCiAgPHVzZSB4PSI4MCIgeT0iNjgwIiB4bGluazpocmVmPSIjbGVmdF9tYXJrZXIiIC8+CiAgPHVzZSB4PSIyODAiIHk9IjY4MCIgeGxpbms6aHJlZj0iI21hcmtlciIgLz4KICA8dXNlIHg9IjQ4MCIgeT0iNjgwIiB4bGluazpocmVmPSIjbWFya2VyIiAvPgogIDx1c2UgeD0iNjgwIiB5PSI2ODAiIHhsaW5rOmhyZWY9IiNtYXJrZXIiIC8+CiAgPHVzZSB4PSI4ODAiIHk9IjY4MCIgeGxpbms6aHJlZj0iI3JpZ2h0X21hcmtlciIgLz4KCiAgPHVzZSB4PSIxODAiIHk9Ijc4MCIgeGxpbms6aHJlZj0iI21hcmtlciIgLz4KICA8dXNlIHg9Ijc4MCIgeT0iNzgwIiB4bGluazpocmVmPSIjbWFya2VyIiAvPgoKICA8dXNlIHg9IjEwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjIwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjMwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjQwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjUwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjYwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjcwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjgwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjkwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KCiAgPHVzZSB4PSIxMDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIyMDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIzMDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI0MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI1MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI2MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI3MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI4MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI5MDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CgogIDx1c2UgeD0iMTAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjIwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iMzAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSI0MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjUwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iNjAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSI3MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjgwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iOTAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSIxMDAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgoKPC9zdmc+Cg==
);
      position: relative;
    }
  }
</style>
