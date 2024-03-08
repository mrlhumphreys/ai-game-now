<script>

</script>

<div id="content">
 <header>
   <h1>AI Game Now</h1>
 </header>
 
 <main>
   <ul class="games">
     <li><a class="game" href="/checkers">Checkers</a></li>
     <li><a class="game" href="/backgammon">Backgammon</a></li>
     <li><a class="game" href="/chess">Chess</a></li>
   </ul>
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

    .games {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;

      .game {
        display: block;
        padding: 1em 0em; 
        margin: 0.5em 10px;
        width: 300px;
        text-align: center;
        text-decoration: none;
        font-size: 3em;
        color: $gray-20;
        background-color: $spot-colour;

        &:hover {
          color: $spot-colour;
          background-color: $gray-20;
        }
      }
    }
  }
</style>
