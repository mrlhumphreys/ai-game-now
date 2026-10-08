<script>
  import capitalize from '#lib/utils/capitalize';

  export let games;
  export let selectedGame;
  export let selectGame;
</script>

<nav class="game_selector">
  <ul>
    {#each games as game}
      <li><a href="#{game}" class="game" class:selected={game === selectedGame} onclick={ () => selectGame(game) }>{capitalize(game)}</a></li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;
  @use '#lib/styles/responsive_full_width.scss' as responsive-full-width;

  nav.game_selector {
    @include responsive-full-width.styles;

    ul {
      background-color: colors.$gray-90;
      display: flex;
      flex-direction: row;

      li {
        a {
          display: block;
          padding: 1em 10px;
          text-decoration: none;
          color: colors.$spot-colour;
          &.selected {
            background-color: colors.$gray-20;
          }
          &:hover {
            color: white;
            background-color: colors.$spot-colour;
          }
        }
      }
    }
  }
</style>

