<script>
  import MatchBarButton from '#lib/shared/MatchBarButton.svelte';

  export let canPass;
  export let touchPass;
</script>

{#if canPass}
  <MatchBarButton label="Pass" onclick={() => touchPass()} />
{/if}

