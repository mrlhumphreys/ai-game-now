<script>
  import capitalize from '$lib/utils/capitalize';

  export let games;
  export let selectedGame;
  export let selectGame;
</script>

<nav class="game_selector">
  <ul>
    {#each games as game}
      <li><a href="#{game}" class="game" class:selected={game === selectedGame} on:click={ () => selectGame(game) }>{capitalize(game)}</a></li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '../styles/colors.scss';
  @import '../styles/responsive_full_width.scss';

  nav.game_selector {
    @include responsive-full-width;

    ul {
      background-color: $gray-90;
      display: flex;
      flex-direction: row;

      li {
        a {
          display: block;
          padding: 1em 10px;
          text-decoration: none;
          color: $spot-colour;
          &.selected {
            background-color: $gray-20;
          }
          &:hover {
            color: white;
            background-color: $spot-colour;
          }
        }
      }
    }
  }
</style>

