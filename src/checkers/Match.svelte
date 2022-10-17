<script>
  import jcheckers from '@mrlhumphreys/jcheckers';
  const CheckersMatch = jcheckers.Match;

  import exists from '../utils/exists';
  import AiService from '../services/AiService';
  import Notification from '../shared/Notification.svelte';
  import ResetControl from '../shared/ResetControl.svelte';
  import PieceImage from './PieceImage.svelte';
  import SquareControl from './SquareControl.svelte';
  import DEFAULT_MATCH_ATTRIBUTES from './DEFAULT_MATCH_ATTRIBUTES';

  const PLAYER_NUMBER = 1;
  const AI_PLAYER_NUMBER = 2;

  export let matchState = DEFAULT_MATCH_ATTRIBUTES;
  $: match = new CheckersMatch(matchState);
  $: notification = match.notification;
  $: squaresWithPieces = matchState.game_state.squares.filter((square) => square.piece != null).sort((a, b) => a.piece.id - b.piece.id);

  function touchSquare(squareId) {
    match.touchSquare(squareId, PLAYER_NUMBER);

    matchState = match.asJson;

    let lastActionKind = exists(match.lastAction) && match.lastAction.kind
    let winner = match.gameState.winner;

    if (lastActionKind === 'move' && !exists(winner)) {
      let aiService = new AiService(AI_SERVICE_URL);
      let game = 'checkers';
      aiService.getMove(game, match.gameState.asJson, (move) => {
        if (exists(move)) {
          let func = () => aiMove(move);
          setTimeout(func, 1500);
        }
      }, (_) => {
        alert("Something went wrong. Please try again later.");
      });
    }
  };

  function aiMove(move) {
    move.forEach((leg) => {
      match.touchSquare(leg, AI_PLAYER_NUMBER);
    });
  
    matchState = match.asJson;
  };

  function touchReset() {
    matchState = DEFAULT_MATCH_ATTRIBUTES;
  };
</script>

<div class="match checkers_match">
  <div class="checkers_board">
    {#each squaresWithPieces as square (square.piece.id)}
      <PieceImage square={square} pov={PLAYER_NUMBER} />
    {/each}
    {#each matchState.game_state.squares as square (square.id)}
      <SquareControl square={square} touchSquare={touchSquare} pov={PLAYER_NUMBER} />
    {/each}
  </div>
  <Notification notification={notification} />
  <div class="match_bar">
    <ResetControl touchReset={touchReset} />
  </div>
</div>

<style lang="scss">
  @import '../styles/colors.scss';
  @import '../styles/match.scss';

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
    background-image: url('./images/checkers-board.svg');
    position: relative;
  }
</style>
