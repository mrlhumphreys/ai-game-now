<div id="bottombar" >
  <footer>
    <a href="https://boardgamenow.herokuapp.com">Board Game Now</a>
  </footer>
</div>

<style type="text/scss">
  @import "../styles/colors.scss";
  @import "../styles/responsive_full_width.scss";

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
