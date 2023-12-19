<script>
  import DieImage from '$lib/backgammon/DieImage.svelte'

  export let dice;
  export let touchDice;
</script>

<div class="dice" role="button" on:click={() => touchDice()}>
  {#each dice as die (die.id)}
    <DieImage number={die.number} used={die.used} />
  {/each}
</div>

<style lang="scss">
  @import '$lib/styles/backgammon_units.scss';

  .dice {
    @media only screen and (max-device-width: 480px) {
      height: $backgammon-vertical-unit;
      padding-top: $backgammon-vertical-unit;
      padding-bottom: $backgammon-vertical-unit;
    }

    @media only screen and (min-device-width: 481px) {
      height: $backgammon-pixel-unit;
      padding-top: $backgammon-pixel-unit;
      padding-bottom: $backgammon-pixel-unit;
    }

    width: 66.66%;
    padding-left: 16.66%;
    padding-right: 16.66%;
    display: flex;
    flex-direction: row;
  }
</style>

