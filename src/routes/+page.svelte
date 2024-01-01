<script>
  import { browser } from '$app/environment';
  import GameSelector from '$lib/shared/GameSelector.svelte';
  import CheckersMatch from '$lib/checkers/Match.svelte';
  import BackgammonMatch from '$lib/backgammon/Match.svelte';
  import ChessMatch from '$lib/chess/Match.svelte';

  const DEFAULT_GAME = 'checkers'

  // Add more games
  const GAMES = [
    'checkers',
    'backgammon',
    'chess'
  ];

  let selectedGame = fetchGameFromUrl();

  function selectGame(name) {
    selectedGame = name;
  };

  function fetchGameFromUrl() {
    let game = 'checkers';
    if (browser) {
      game = window.location.hash.substring(1);
    }
    if (GAMES.includes(game)) {
      return game;
    } else {
      return DEFAULT_GAME;
    };
  };
</script>

<div id="content">
 <header>
   <h1>AI Game Now</h1>
 </header>

 <GameSelector games={GAMES} selectedGame={selectedGame} selectGame={selectGame} />
 
 <main>
   <article class="match_container" class:selected={'checkers' === selectedGame}>
     <CheckersMatch />
   </article>

   <article class="match_container" class:selected={'backgammon' === selectedGame}>
     <BackgammonMatch />
   </article>

   <article class="match_container" class:selected={'chess' === selectedGame}>
     <ChessMatch />
   </article>
 </main>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/responsive_full_width.scss';

  header {
    @include responsive-full-width;

    h1 {
      font-size: 3em;
      font-weight: lighter;
      text-align: center;
      padding: 0.5em;
    }
  }

  main {
    @include responsive-full-width;
  }

  .match_container {
    display: none;
    background-color: $gray-20;

    &.selected {
      display: block
    }
  }
</style>
