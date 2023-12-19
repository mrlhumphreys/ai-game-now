<script>
  export let vertical;
  export let horizontal;
  export let colour;

  let cx = calculatePipPosition(horizontal);
  let cy = calculatePipPosition(vertical);

  function calculatePipPosition(position) {
    switch (position) {
      case 'left':
        return 30;
      case 'top':
        return 30;
      case 'right':
        return 70;
      case 'bottom':
        return 70;
      default: 
        return 50;
    }
  }
</script>

<circle cx="{cx}" cy="{cy}" r="7" stroke="{colour}" stroke-width="1" fill={colour} />

