<script>
  import DieFaceOne from '$lib/backgammon/DieFaceOne.svelte'
  import DieFaceTwo from '$lib/backgammon/DieFaceTwo.svelte'
  import DieFaceThree from '$lib/backgammon/DieFaceThree.svelte'
  import DieFaceFour from '$lib/backgammon/DieFaceFour.svelte'
  import DieFaceFive from '$lib/backgammon/DieFaceFive.svelte'
  import DieFaceSix from '$lib/backgammon/DieFaceSix.svelte'
  import DieFaceDefault from '$lib/backgammon/DieFaceDefault.svelte'

  export let number;
  export let used;

  $: background = calculateDieBackgroundColour(used);
  $: colour = calculateDieColour(used);

  function calculateDieBackgroundColour(used) {
    if (used) {
      return '#ffffff';
    } else {
      return '#303030';
    }
  }

  function calculateDieColour(used) {
    if (used) {
      return '#d0d0d0';
    } else {
      return '#ffffff';
    }
  }
</script>

<div class="die">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <rect x="12.5" y="12.5" width="75" height="75" stroke={colour} stroke-width="3" fill={background} />
    {#if number === 1}
      <DieFaceOne colour={colour} />
    {:else if number === 2}
      <DieFaceTwo colour={colour} />
    {:else if number === 3}
      <DieFaceThree colour={colour} />
    {:else if number === 4}
      <DieFaceFour colour={colour} />
    {:else if number === 5}
      <DieFaceFive colour={colour} />
    {:else if number === 6}
      <DieFaceSix colour={colour} />
    {:else}
      <DieFaceDefault colour={colour} />
    {/if}
  </svg>
</div>

<style lang="scss">
  .die {
    width: 25%;
    margin: 0 auto;
  }
</style>

