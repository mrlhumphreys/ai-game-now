<script>
  import TopBar from './layout/TopBar.svelte';
  import BottomBar from './layout/BottomBar.svelte';
  import GameSelector from './shared/GameSelector.svelte';
  import CheckersMatch from './checkers/Match.svelte';

  // Add more games
  let games = [
    'checkers'
  ];

  let selectedGame = 'checkers';

  function selectGame(name) {
    selectedGame = name;
  };
</script>

<TopBar />

<div id="content">
 <header>
   <h1>AI Game Now</h1>
 </header>

 <GameSelector games={games} selectedGame={selectedGame} selectGame={selectGame} />

 <main>
   <article class="match_container" class:selected={'checkers' === selectedGame}>
     <CheckersMatch />  
   </article>

   <!-- Add More Games -->
 </main>
</div>

<BottomBar />

<style type="text/scss">
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
