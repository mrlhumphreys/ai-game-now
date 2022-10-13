<script>
  import TopBar from './layout/TopBar.svelte';
  import BottomBar from './layout/BottomBar.svelte';
  import GameSelector from './shared/GameSelector.svelte';
  import CheckersMatch from './checkers/Match.svelte';
  import BackgammonMatch from './backgammon/Match.svelte';

  const DEFAULT_GAME = 'checkers'

  // Add more games
  const GAMES = [
    'checkers',
    'backgammon'
  ];

  let selectedGame = fetchGameFromUrl();

  function selectGame(name) {
    selectedGame = name;
  };

  function fetchGameFromUrl() {
    let game = window.location.hash.substring(1);
    if (GAMES.includes(game)) {
      return game;
    } else {
      return DEFAULT_GAME;
    };
  };
</script>

<TopBar />

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
 </main>
</div>

<BottomBar />

<style lang="scss">
  @import './styles/colors.scss';
  @import './styles/responsive_full_width.scss';

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
