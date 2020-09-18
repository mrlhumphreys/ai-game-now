<script>
  import jcheckers from '@mrlhumphreys/jcheckers';
  const CheckersMatch = jcheckers.default.Match;

  import exists from '../utils/exists';
  import AiService from '../services/ai_service';
  import Notification from '../shared/Notification.svelte';
  import ResetControl from '../shared/ResetControl.svelte';
  import PieceImage from './PieceImage.svelte';
  import SquareControl from './SquareControl.svelte';

  const DEFAULT_MATCH_ATTRIBUTES = {
    id: 0,
    game_state: {
      current_player_number: 1,
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
        { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
        { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},
        { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
        { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
        { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},
        { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
        { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
        { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
        { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false }},
        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: null },
        { id: 16, x: 6, y: 3, piece: null },
        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },
        { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
        { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
        { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
        { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},
        { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
        { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
        { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
        { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},
        { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
        { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
        { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
        { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
      ]
    },
    players: [
      { player_number: 1, name: 'Player' },
      { player_number: 2, name: 'Computer' }
    ],
    winner: null,
    current_move_from_id: null,
    current_move_to_ids: [],
    last_action: {},
    notification: 'Player to move'
  };

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

<style type="text/scss">
  @import '../styles/colors.scss';

  .match {
    margin: 1em auto;
  }

  .match_bar {
    border-top: solid 1px $gray-20;
    width: 100%;
    margin: 0em auto;
    background-color: $gray-60;
    display: flex;
    flex-direction: row;
  }

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
    background-image: url('/images/checkers-board.svg');
    position: relative;
  }
</style>
