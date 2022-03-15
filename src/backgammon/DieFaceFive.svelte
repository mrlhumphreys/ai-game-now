<script>
  import Pip from './Pip.svelte'

  export let colour;
</script>

<Pip colour={colour} vertical="top" horizontal="left" />
<Pip colour={colour} vertical="top" horizontal="right" />
<Pip colour={colour} vertical="middle" horizontal="middle" />
<Pip colour={colour} vertical="bottom" horizontal="left" />
<Pip colour={colour} vertical="bottom" horizontal="right" />
