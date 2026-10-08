<script>
  import { resolve } from '$app/paths';
</script>

<div id="topbar">
  <nav>
    <a href="{resolve('')}" class="logo">AI Game Now</a>
  </nav>
</div>
<slot></slot>
<div id="bottombar" >
  <footer>
    <a href="{resolve('checkers')}">Checkers</a>
    <a href="{resolve('backgammon')}">Backgammon</a>
    <a href="{resolve('chess')}">Chess</a>
    <a href="{resolve('go')}">Go</a>
    <a href="{resolve('shogi')}">Shogi</a>
    <a href="{resolve('xiangqi')}">Xiangqi</a>
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
