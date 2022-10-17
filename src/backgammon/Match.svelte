<script>
  import jbackgammon from '@mrlhumphreys/jbackgammon';
  const BackgammonMatch = jbackgammon.Match;

  import exists from '../utils/exists';
  import AiService from '../services/AiService';
  import Notification from '../shared/Notification.svelte';
  import ResetControl from '../shared/ResetControl.svelte';
  import PointControl from './PointControl.svelte';
  import BarControl from './BarControl.svelte';
  import OffBoardControl from './OffBoardControl.svelte';
  import PassControl from './PassControl.svelte';
  import DiceControl from './DiceControl.svelte';
  import PieceImage from './PieceImage.svelte';
  import collatePieces from './collatePieces';
  import DEFAULT_MATCH_ATTRIBUTES from './DEFAULT_MATCH_ATTRIBUTES';

  const PLAYER_NUMBER = 1;
  const AI_PLAYER_NUMBER = 2;
  const TOP_LEFT = [13, 14, 15, 16, 17, 18];
  const TOP_RIGHT = [19, 20, 21, 22, 23, 24];
  const BOTTOM_LEFT = [12, 11, 10, 9, 8 , 7];
  const BOTTOM_RIGHT = [6, 5, 4, 3, 2, 1];

  export let matchState = DEFAULT_MATCH_ATTRIBUTES;
  $: match = new BackgammonMatch(matchState);
  $: notification = match.notification;
  $: passable = match.passable(PLAYER_NUMBER);
  $: pieces = collatePieces(matchState);
  $: dice = matchState.game_state.dice;

  // Actions

  function touchDice() {
    match.touchDice(PLAYER_NUMBER);
    matchState = match.asJson;
  }

  function touchPoint(pointNumber) {
    match.touchPoint(pointNumber, PLAYER_NUMBER);
    matchState = match.asJson;

    let lastActionKind = exists(match.lastAction) && match.lastAction.kind;
    let winner = match.gameState.winner;

    if (lastActionKind === 'move' && !exists(winner)) {
      aiTurn();
    }
  }

  function touchPass() {
    match.touchPass(PLAYER_NUMBER);
    matchState = match.asJson;

    aiTurn();
  }

  function touchReset() {
    matchState = DEFAULT_MATCH_ATTRIBUTES;
  }

  function aiTurn() {
    aiRoll();
    if (match.passable(AI_PLAYER_NUMBER)) {
      aiPass();
    } else {
      let aiService = new AiService(AI_SERVICE_URL);
      let game = 'backgammon';
      aiService.getMove(game, match.gameState.asJson, (moveList) => {
        if (exists(moveList)) {
          let moveFunc = () => aiMove(moveList);
          setTimeout(moveFunc, 1500);
        }
      }, (_) => {
        alert("Something went wrong. Please try again later.");
      });
    }
  }

  function aiRoll() {
    match.touchDice(AI_PLAYER_NUMBER);
    matchState = match.asJson;
  }

  function aiMove(moveList) {
    moveList.forEach((move, index) => {
      let legFunc = () => {
        match.touchPoint(move[0], AI_PLAYER_NUMBER);
        match.touchPoint(move[1], AI_PLAYER_NUMBER);
        matchState = match.asJson;
      };
      setTimeout(legFunc, index*1500);
    });

    let passFunc = () => {
      if (match.passable(AI_PLAYER_NUMBER)) {
        aiPass();
      }
    };

    setTimeout(passFunc, (moveList.length+1)*1500);
  }

  function aiPass() {
    match.touchPass(AI_PLAYER_NUMBER);
    matchState = match.asJson;
  }
</script>

<div class="match backgammon_match">
  <div class="backgammon_board">
    <div class="pieces">
      {#each pieces as piece (piece.piece.id)}
        <PieceImage pointNumber={piece.point.number} pieceIndex={piece.pieceIndex} playerNumber={piece.piece.player_number} selected={piece.point.selected} pov={PLAYER_NUMBER} />
      {/each}
    </div>
    <div class="controls">
      <div class="off_board">
        <OffBoardControl position="top" touchPoint={touchPoint} />
        <OffBoardControl position="bottom" touchPoint={touchPoint} />
      </div>
      <div class="left">
        <div class="points">
          {#each TOP_LEFT as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
        <DiceControl dice={dice} touchDice={touchDice} />
        <div class="points">
          {#each BOTTOM_LEFT as number (number)}
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
          {#each TOP_RIGHT as number (number)}
            <PointControl number={number} touchPoint={touchPoint} />
          {/each}
        </div>
        <PassControl passable={passable} touchPass={touchPass} />
        <div class="points">
          {#each BOTTOM_RIGHT as number (number)}
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
  @import '../styles/colors.scss';
  @import '../styles/match.scss';
  @import '../styles/backgammon_units.scss';

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
