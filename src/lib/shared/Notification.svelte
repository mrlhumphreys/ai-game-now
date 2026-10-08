<script>
  export let notification;
</script>

<div class="notification">
  <p>{notification}</p>
</div>

<style lang="scss">
  @use '#lib/styles/colors.scss' as colors;

  .notification {
    width: 100%;
    background-color: colors.$gray-90;
    border-top: solid 1px colors.$gray-20;

    p {
      letter-spacing: 0.125em;
      height: 1em;
      padding: 1em;
      text-align: center;
      color: colors.$gray-20;
    }
  }
</style>

