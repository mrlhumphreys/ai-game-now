<script>
  import Pip from './Pip.svelte'

  export let colour;
</script>

<Pip colour={colour} vertical="top" horizontal="left" />
<Pip colour={colour} vertical="bottom" horizontal="right" />

