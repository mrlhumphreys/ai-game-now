<div id="topbar">
  <nav>
    <a href="#" class="logo">AI Game Now</a>
  </nav>
</div>

<style lang="scss">
  @import "../styles/colors.scss";
  @import "../styles/responsive_full_width.scss";

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
</style>
