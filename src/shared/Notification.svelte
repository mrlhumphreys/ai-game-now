<script>
  export let notification;
</script>

<div class="notification">
  <p>{notification}</p>
</div>

<style lang="scss">
  @import '../styles/colors.scss';

  .notification {
    width: 100%;
    background-color: $gray-90;
    border-top: solid 1px $gray-20;

    p {
      letter-spacing: 0.125em;
      height: 1em;
      padding: 1em;
      text-align: center;
      color: $gray-20;
    }
  }
</style>
