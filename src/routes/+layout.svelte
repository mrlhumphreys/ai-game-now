<script>
</script>

<div id="topbar">
  <nav>
    <a href="/" class="logo">AI Game Now</a>
  </nav>
</div>
<slot></slot>
<div id="bottombar" >
  <footer>
    <a href="/checkers">Checkers</a>
    <a href="/backgammon">Backgammon</a>
    <a href="/chess">Chess</a>
    <a href="/go">Go</a>
    <a href="/shogi">Shogi</a>
    <a href="/xiangqi">Xiangqi</a>
  </footer>
</div>

<style lang="scss">
  @use "#lib/styles/colors.scss" as colors;
  @use "#lib/styles/responsive_full_width.scss" as responsive-full-width;

  #topbar {
    @include responsive-full-width.styles;
    & {
      background-color: colors.$gray-20;
    }

    nav {
      display: flex;
      flex-direction: row;

      a {
        color: colors.$spot-colour;
        display: block;
        padding: 1em 10px;
        text-decoration: none;

        &:hover {
          color: white;
          background-color: colors.$spot-colour;
        }

        &.logo {
          letter-spacing: 0.125em;
        }
      }
    }
  }

  #bottombar {
    background-color: colors.$gray-80;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    @include responsive-full-width.styles;

    footer {
      display: flex;
      flex-direction: row;

      a {
        display: block;
        padding: 1em 10px;
        text-decoration: none;
        color: colors.$gray-20;

        &:hover {
          color: colors.$gray-60;
        }
      }
    }
  }
</style>
