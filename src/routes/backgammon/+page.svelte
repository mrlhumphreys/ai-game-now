<script>
  import BackgammonMatch from '$lib/backgammon/Match.svelte';
</script>

<div id="content">
 <header>
   <h1>Backgammon</h1>
 </header>
 
 <main>
   <article class="match_container">
     <BackgammonMatch />
   </article>
 </main>
</div>

<style lang="scss">
  @import '$lib/styles/colors.scss';
  @import '$lib/styles/responsive_full_width.scss';

  header {
    @include responsive-full-width;

    h1 {
      font-size: 3em;
      font-weight: lighter;
      text-align: center;
      padding: 0.5em;
    }
  }

  main {
    @include responsive-full-width;
  }
</style>
