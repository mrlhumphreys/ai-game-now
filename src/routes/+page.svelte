<script>
  import { resolve } from '$app/paths';
</script>

<div id="content">
 <header>
   <h1>AI Game Now</h1>
 </header>

 <main>
   <ul class="games">
     <li><a class="game" href="{resolve('checkers')}">Checkers</a></li>
     <li><a class="game" href="{resolve('/backgammon')}">Backgammon</a></li>
     <li><a class="game" href="{resolve('/chess')}">Chess</a></li>
     <li><a class="game" href="{resolve('/go')}">Go</a></li>
     <li><a class="game" href="{resolve('/shogi')}">Shogi</a></li>
     <li><a class="game" href="{resolve('/xiangqi')}">Xiangqi</a></li>
   </ul>
 </main>
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;
  @use '#lib/styles/responsive_full_width.scss' as responsive-full-width;

  header {
    @include responsive-full-width.styles;

    h1 {
      font-size: 3em;
      font-weight: lighter;
      text-align: center;
      padding: 0.5em;
    }
  }

  main {
    @include responsive-full-width.styles;

    .games {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .game {
        display: block;
        padding: 1em 0em;
        margin: 0.5em 10px;
        width: 300px;
        text-align: center;
        text-decoration: none;
        font-size: 3em;
        color: colors.$gray-20;
        background-color: colors.$spot-colour;

        &:hover {
          color: colors.$spot-colour;
          background-color: colors.$gray-20;
        }
      }
    }
  }
</style>
