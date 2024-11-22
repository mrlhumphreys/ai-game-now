<script>
  import { browser } from '$app/environment';
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';

  import exists from '$lib/utils/exists';
  import tossCoin from '$lib/utils/tossCoin';
  import AiService from '$lib/services/AiService';
  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';

  import {
    touchPoint as matchTouchPoint,
    touchPass as matchTouchPass,
    canPass,
    gameOver,
    playerScore
  } from '$lib/go/logic/match';

  import StoneImage from '$lib/go/StoneImage.svelte';
  import PointControl from '$lib/go/PointControl.svelte';
  import PassControl from '$lib/go/PassControl.svelte';
  import PlayerStats from '$lib/go/PlayerStats.svelte';
  import buildMatchAttributes from '$lib/go/logic/buildMatchAttributes';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;

  $: matchState;
  $: notification = matchState.notification;
  $: playerStats = matchState.gameState.playerStats;
  $: playerOneScore = playerScore(matchState, 1);
  $: playerTwoScore = playerScore(matchState, 2);
  $: pointsWithStones = matchState.gameState.points.filter((point) => point.stone !== null).sort((a, b) => a.stone.id - b.stone.id);
  $: canPassState = canPass(matchState, playerNumber);

  // state
  function saveState(state) {
    matchState = state;
    if (browser) {
      let data = JSON.stringify(state);
      window.localStorage.setItem('go', data);
    }
  }

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('go');
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
  }

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
    if (move.pointId === 'tt') {
      matchTouchPass(matchState, aiPlayerNumber);
    } else {
      matchTouchPoint(matchState, aiPlayerNumber, move.pointId);
    }
    saveState(matchState);
  };

  function aiTurn() {
    let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
    let game = 'go';
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
  function touchPoint(pointId) {
    matchTouchPoint(matchState, playerNumber, pointId);
    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind
    if (lastActionKind === 'move' && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchPass() {
    matchTouchPass(matchState, playerNumber);
    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind
    if (lastActionKind === 'pass' && !gameOver(matchState)) {
      aiTurn();
    }
  };

  function touchReset() {
    setDefaultState();
  };
</script>

<div class="match go_match">
  <div class="go_board">
    {#each pointsWithStones as point (point.id)}
      <StoneImage point={point} pov={playerNumber} />
    {/each}

    {#each matchState.gameState.points as point (point.id)}
      <PointControl point={point} touchPoint={touchPoint} pov={playerNumber} />
    {/each}
  </div>
  <PlayerStats playerStats={playerStats} playerOneScore={playerOneScore} playerTwoScore={playerTwoScore}/>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
    <PassControl touchPass={touchPass} canPass={canPassState} />
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/match.scss';

  .go_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 760px;
    }
  }

  .go_board {
    @media only screen and (max-device-width: 480px) {
      height: 100vw;
    }

    @media only screen and (min-device-width: 481px) {
      height: 760px;
    }

    & {
      width: 100%;
      cursor: pointer;
      background-size: 100% 100%;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iMjAwMCIgd2lkdGg9IjIwMDAiPgoKICA8ZGVmcz4KICAgIDxnIGlkPSJ2ZXJ0aWNhbF9saW5lIj4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjE4MDAiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSI1cHgiIC8+CiAgICA8L2c+CgogICAgPGcgaWQ9Imhvcml6b250YWxfbGluZSI+CiAgICAgIDxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjE4MDAiIHkyPSIwIiBzdHJva2U9IiM2MDYwNjAiIHN0cm9rZS13aWR0aD0iNXB4IiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJkb3QiPgogICAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTMiIGZpbGw9IiM2MDYwNjAiIC8+CiAgICA8L2c+CiAgPC9kZWZzPgogIAogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiICBmaWxsPSIjZDBkMGQwIiAvPgoKICA8dXNlIHg9IjEwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjIwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjMwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjQwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjUwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KCiAgPHVzZSB4PSI2MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI3MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI4MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSI5MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgoKICA8dXNlIHg9IjExMDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMjAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgogIDx1c2UgeD0iMTMwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjE0MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIxNTAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgoKICA8dXNlIHg9IjE2MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CiAgPHVzZSB4PSIxNzAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiN2ZXJ0aWNhbF9saW5lIiAvPgogIDx1c2UgeD0iMTgwMCIgeT0iMTAwIiB4bGluazpocmVmPSIjdmVydGljYWxfbGluZSIgLz4KICA8dXNlIHg9IjE5MDAiIHk9IjEwMCIgeGxpbms6aHJlZj0iI3ZlcnRpY2FsX2xpbmUiIC8+CgogIDx1c2UgeD0iMTAwIiB5PSIxMDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjIwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iMzAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSI0MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjUwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KCiAgPHVzZSB4PSIxMDAiIHk9IjYwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iNzAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSI4MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjkwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KICA8dXNlIHg9IjEwMCIgeT0iMTAwMCIgeGxpbms6aHJlZj0iI2hvcml6b250YWxfbGluZSIgLz4KCiAgPHVzZSB4PSIxMDAiIHk9IjExMDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjEyMDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjEzMDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjE0MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CiAgPHVzZSB4PSIxMDAiIHk9IjE1MDAiIHhsaW5rOmhyZWY9IiNob3Jpem9udGFsX2xpbmUiIC8+CgogIDx1c2UgeD0iMTAwIiB5PSIxNjAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSIxNzAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSIxODAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgogIDx1c2UgeD0iMTAwIiB5PSIxOTAwIiB4bGluazpocmVmPSIjaG9yaXpvbnRhbF9saW5lIiAvPgoKICA8dXNlIHg9IjQwMCIgeT0iNDAwIiB4bGluazpocmVmPSIjZG90IiAvPgogIDx1c2UgeD0iMTAwMCIgeT0iNDAwIiB4bGluazpocmVmPSIjZG90IiAvPgogIDx1c2UgeD0iMTYwMCIgeT0iNDAwIiB4bGluazpocmVmPSIjZG90IiAvPgoKICA8dXNlIHg9IjQwMCIgeT0iMTAwMCIgeGxpbms6aHJlZj0iI2RvdCIgLz4KICA8dXNlIHg9IjEwMDAiIHk9IjEwMDAiIHhsaW5rOmhyZWY9IiNkb3QiIC8+CiAgPHVzZSB4PSIxNjAwIiB5PSIxMDAwIiB4bGluazpocmVmPSIjZG90IiAvPgoKICA8dXNlIHg9IjQwMCIgeT0iMTYwMCIgeGxpbms6aHJlZj0iI2RvdCIgLz4KICA8dXNlIHg9IjEwMDAiIHk9IjE2MDAiIHhsaW5rOmhyZWY9IiNkb3QiIC8+CiAgPHVzZSB4PSIxNjAwIiB5PSIxNjAwIiB4bGluazpocmVmPSIjZG90IiAvPgo8L3N2Zz4K);
      position: relative;
    }
  }
</style>
