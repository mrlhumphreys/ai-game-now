<script>
  import { base } from '$app/paths';
</script>

<div id="topbar">
  <nav>
    <a href="{base}/" class="logo">AI Game Now</a>
  </nav>
</div>
<slot></slot>
<div id="bottombar" >
  <footer>
    <a href="{base}/checkers">Checkers</a>
    <a href="{base}/backgammon">Backgammon</a>
    <a href="{base}/chess">Chess</a>
  </footer>
</div>

<style lang="scss">
  @import "$lib/styles/colors.scss";
  @import "$lib/styles/responsive_full_width.scss";

  #topbar {
    @include responsive-full-width;
    background-color: $gray-20;

    nav {
      display: flex;
      flex-direction: row;

      a {
        color: $spot-colour;
        display: block;
        padding: 1em 10px;
        text-decoration: none;

        &:hover {
          color: white;
          background-color: $spot-colour;
        }

        &.logo {
          letter-spacing: 0.125em;
        }
      }
    }
  }
  
  #bottombar {
    background-color: $gray-80;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    @include responsive-full-width;

    footer {
      display: flex;
      flex-direction: row;

      a {
        display: block;
        padding: 1em 10px;
        text-decoration: none;
        color: $gray-20;

        &:hover {
          color: $gray-60;
        }
      }
    }
  }
</style>
