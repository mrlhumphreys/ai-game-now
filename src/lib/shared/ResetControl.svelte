<script>
  import MatchBarButton from '#lib/shared/MatchBarButton.svelte';

  export let touchReset;
</script>

<MatchBarButton label="Reset" onclick={() => touchReset()} />


