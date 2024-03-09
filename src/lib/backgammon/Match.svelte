<script>
  // bug: wait after player move and before ai roll
  // bug: when too many pieces on one point, piece is rendered in corner
  // bug: off board: move does not match dice roll (ai)
  // bug: double roll doesn't douplicate dice
  import { browser } from '$app/environment';
  import { PUBLIC_AI_SERVICE_URL } from '$env/static/public';

  import exists from '$lib/utils/exists';
  import tossCoin from '$lib/utils/tossCoin';
  import AiService from '$lib/services/AiService';
  import {
    touchDice as matchTouchDice,
    touchPoint as matchTouchPoint,
    touchPass as matchTouchPass,
    passable as matchPassable,
    winner as matchWinner
  } from '$lib/backgammon/logic/match';
  import buildMatchAttributes from '$lib/backgammon/logic/buildMatchAttributes';

  import Notification from '$lib/shared/Notification.svelte';
  import ResetControl from '$lib/shared/ResetControl.svelte';
  import PointControl from '$lib/backgammon/PointControl.svelte';
  import BarControl from '$lib/backgammon/BarControl.svelte';
  import OffBoardControl from '$lib/backgammon/OffBoardControl.svelte';
  import PassControl from '$lib/backgammon/PassControl.svelte';
  import DiceControl from '$lib/backgammon/DiceControl.svelte';
  import PieceImage from '$lib/backgammon/PieceImage.svelte';
  import collatePieces from '$lib/backgammon/logic/collatePieces';

  export let playerNumber = undefined;
  export let aiPlayerNumber = undefined;
  export let matchState = undefined;
  export let topLeft = undefined;
  export let topRight = undefined;
  export let bottomLeft = undefined;
  export let bottomRight = undefined;

  $: matchState;
  $: notification = matchState.notification;
  $: passable = matchPassable(matchState, playerNumber);
  $: pieces = collatePieces(matchState);
  $: dice = matchState.gameState.dice;

  // state
  function saveState(state) {
    matchState = state;
    if (browser) {
      let data = JSON.stringify(state);
      window.localStorage.setItem('backgammon', data);
    }
  };

  function getState() {
    if (browser) {
      let data = window.localStorage.getItem('backgammon');
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

    if (playerNumber === 1) {
      topLeft = [13, 14, 15, 16, 17, 18];
      topRight = [19, 20, 21, 22, 23, 24];
      bottomLeft = [12, 11, 10, 9, 8 , 7];
      bottomRight = [6, 5, 4, 3, 2, 1];
    } else {
      topLeft = [1, 2, 3, 4, 5, 6];
      topRight = [7, 8, 9, 10, 11, 12];
      bottomLeft = [24, 23, 22, 21, 20 , 19];
      bottomRight = [18, 17, 16, 15, 14, 13];
    }
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
  }

  // setup
  setInitialMatchState();

  // ai action functions
  function aiTurn() {
    aiRoll();
    if (matchPassable(matchState, aiPlayerNumber)) {
      aiPass();
    } else {
      let aiService = new AiService(PUBLIC_AI_SERVICE_URL);
      let game = 'backgammon';
      aiService.postMove(game, matchState.gameState, (moveList) => {
        if (exists(moveList)) {
          let moveFunc = () => aiMove(moveList);
          setTimeout(moveFunc, 1500);
        }
      }, (_) => {
        if (browser) {
          alert("Something went wrong. Please try again later.");
        }
      });
    }
  }

  function aiRoll() {
    matchTouchDice(matchState, aiPlayerNumber);
    saveState(matchState);
  }

  function aiMove(moveList) {
    moveList.forEach((move, index) => {
      let legFunc = () => {
        matchTouchPoint(matchState, aiPlayerNumber, move[0]);
        matchTouchPoint(matchState, aiPlayerNumber, move[1]);
        saveState(matchState);
      };
      setTimeout(legFunc, index*1500);
    });

    let passFunc = () => {
      if (matchPassable(matchState, aiPlayerNumber)) {
        aiPass();
      }
    };

    setTimeout(passFunc, (moveList.length+1)*1500);
  }

  function aiPass() {
    matchTouchPass(matchState, aiPlayerNumber);
    saveState(matchState);
  }

  function touchDice() {
    matchTouchDice(matchState, playerNumber);
    saveState(matchState);
  }

  // user action functions

  function touchPoint(pointNumber) {
    matchTouchPoint(matchState, playerNumber, pointNumber);
    saveState(matchState);

    let lastActionKind = exists(matchState.lastAction) && matchState.lastAction.kind;
    let winner = matchWinner(matchState);

    if (lastActionKind === 'move' && !exists(winner)) {
      aiTurn();
    }
  }

  function touchPass() {
    matchTouchPass(matchState, playerNumber);
    saveState(matchState);

    aiTurn();
  }

  function touchReset() {
    setDefaultState();
  }
</script>

<div class="match backgammon_match">
  <div class="backgammon_board">
    <div class="pieces">
      {#each pieces as piece (piece.piece.id)}
        <PieceImage pointNumber={piece.point.number} pieceIndex={piece.pieceIndex} playerNumber={piece.piece.playerNumber} selected={piece.point.selected} pov={playerNumber} />
      {/each}
    </div>
    <div class="controls">
      <div class="off_board">
        <OffBoardControl position="top" touchPoint={touchPoint} />
        <OffBoardControl position="bottom" touchPoint={touchPoint} />
      </div>
      <div class="left">
        <div class="points">
          {#each topLeft as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
        <DiceControl dice={dice} touchDice={touchDice} />
        <div class="points">
          {#each bottomLeft as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
      </div>
      <div class="bar">
        <BarControl touchPoint={touchPoint} position="top" />
        <BarControl touchPoint={touchPoint} position="bottom" />
      </div>
      <div class="right">
        <div class="points">
          {#each topRight as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
        <PassControl passable={passable} touchPass={touchPass} />
        <div class="points">
          {#each bottomRight as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
      </div>
      <div class="off_board">
        <OffBoardControl position="top" touchPoint={touchPoint} />
        <OffBoardControl position="bottom" touchPoint={touchPoint} />
      </div>
    </div>
  </div>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
  </div>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/match.scss';
  @import '$lib/styles/backgammon_units.scss';

  .backgammon_match {
    @media only screen and (max-device-width: 480px) {
      width: 100%;
    }

    @media only screen and (min-device-width: 481px) {
      width: 752px;
    }

  }

  .backgammon_board {
    @media only screen and (max-device-width: 480px) {
      height: 13*$backgammon-vertical-unit;
    }

    @media only screen and (min-device-width: 481px) {
      height: 13*$backgammon-pixel-unit;
    }

    width: 100%;
    cursor: pointer;
    overflow: hidden;
    background-size: 100% 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iMTMwMCIgd2lkdGg9IjE1MDAiPgogIDxkZWZzPgogICAgPGcgaWQ9ImV2ZW5fcG9pbnRfdG9wIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxLDEgOTksMSA1MCw1MDAiIHN0cm9rZT0iI2EwYTBhMCIgZmlsbD0iI2EwYTBhMCIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJvZGRfcG9pbnRfdG9wIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxLDEgOTksMSA1MCw1MDAiIHN0cm9rZT0iI2ZmZmZmZiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJldmVuX3BvaW50X2JvdHRvbSI+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMSwxIDk5LDEgNTAsNTAwIiBzdHJva2U9IiNhMGEwYTAiIGZpbGw9IiNhMGEwYTAiIHN0cm9rZS13aWR0aD0iMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLCA1MDApIHJvdGF0ZSgxODApIiAvPgogICAgPC9nPgoKICAgIDxnIGlkPSJvZGRfcG9pbnRfYm90dG9tIj4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxLDEgOTksMSA1MCw1MDAiIHN0cm9rZT0iI2ZmZmZmZiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAsIDUwMCkgcm90YXRlKDE4MCkiIC8+CiAgICA8L2c+CgogICAgPGcgaWQ9ImVkZ2UiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMDAiICBmaWxsPSIjNjA2MDYwIiAvPgogICAgPC9nPgogIDwvZGVmcz4KCiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgIGZpbGw9IiNkMGQwZDAiIC8+CgogIDx1c2UgeD0iMCIgeT0iMCIgeGxpbms6aHJlZj0iI2VkZ2UiIC8+CgogIDx1c2UgeD0iMTAwIiB5PSIwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X3RvcCIgLz4KICA8dXNlIHg9IjIwMCIgeT0iMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfdG9wIiAvPgogIDx1c2UgeD0iMzAwIiB5PSIwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X3RvcCIgLz4KICA8dXNlIHg9IjQwMCIgeT0iMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfdG9wIiAvPgogIDx1c2UgeD0iNTAwIiB5PSIwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X3RvcCIgLz4KICA8dXNlIHg9IjYwMCIgeT0iMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfdG9wIiAvPgoKICA8dXNlIHg9IjEwMCIgeT0iODAwIiB4bGluazpocmVmPSIjZXZlbl9wb2ludF9ib3R0b20iIC8+CiAgPHVzZSB4PSIyMDAiIHk9IjgwMCIgeGxpbms6aHJlZj0iI29kZF9wb2ludF9ib3R0b20iIC8+CiAgPHVzZSB4PSIzMDAiIHk9IjgwMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfYm90dG9tIiAvPgogIDx1c2UgeD0iNDAwIiB5PSI4MDAiIHhsaW5rOmhyZWY9IiNvZGRfcG9pbnRfYm90dG9tIiAvPgogIDx1c2UgeD0iNTAwIiB5PSI4MDAiIHhsaW5rOmhyZWY9IiNldmVuX3BvaW50X2JvdHRvbSIgLz4KICA8dXNlIHg9IjYwMCIgeT0iODAwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X2JvdHRvbSIgLz4KCiAgPHVzZSB4PSI3MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNlZGdlIiAvPgoKICA8dXNlIHg9IjgwMCIgeT0iMCIgeGxpbms6aHJlZj0iI29kZF9wb2ludF90b3AiIC8+CiAgPHVzZSB4PSI5MDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNldmVuX3BvaW50X3RvcCIgLz4KICA8dXNlIHg9IjEwMDAiIHk9IjAiIHhsaW5rOmhyZWY9IiNvZGRfcG9pbnRfdG9wIiAvPgogIDx1c2UgeD0iMTEwMCIgeT0iMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfdG9wIiAvPgogIDx1c2UgeD0iMTIwMCIgeT0iMCIgeGxpbms6aHJlZj0iI29kZF9wb2ludF90b3AiIC8+CiAgPHVzZSB4PSIxMzAwIiB5PSIwIiB4bGluazpocmVmPSIjZXZlbl9wb2ludF90b3AiIC8+CgogIDx1c2UgeD0iODAwIiB5PSI4MDAiIHhsaW5rOmhyZWY9IiNldmVuX3BvaW50X2JvdHRvbSIgLz4KICA8dXNlIHg9IjkwMCIgeT0iODAwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X2JvdHRvbSIgLz4KICA8dXNlIHg9IjEwMDAiIHk9IjgwMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfYm90dG9tIiAvPgogIDx1c2UgeD0iMTEwMCIgeT0iODAwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X2JvdHRvbSIgLz4KICA8dXNlIHg9IjEyMDAiIHk9IjgwMCIgeGxpbms6aHJlZj0iI2V2ZW5fcG9pbnRfYm90dG9tIiAvPgogIDx1c2UgeD0iMTMwMCIgeT0iODAwIiB4bGluazpocmVmPSIjb2RkX3BvaW50X2JvdHRvbSIgLz4KCiAgPHVzZSB4PSIxNDAwIiB5PSIwIiB4bGluazpocmVmPSIjZWRnZSIgLz4KCjwvc3ZnPgoK);

    .pieces {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
    }

    .controls {
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: row;
    }

    .left {
      width: 6*$backgammon-percent-unit;
    }

    .right {
      width: 6*$backgammon-percent-unit;
    }

    .bar {
      width: $backgammon-percent-unit;
      height: 100%;
    }

    .off_board {
      width: $backgammon-percent-unit;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .points {
      display: flex;
      flex-direction: row;
    }
  }
</style>

