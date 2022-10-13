<script>
  import calculateStrokeColour from '../utils/calculateStrokeColour';
  import calculateBackgroundColour from '../utils/calculateBackgroundColour';
  import calculatePieceClassName from './calculatePieceClassName';

  export let pointNumber;
  export let pieceIndex;
  export let playerNumber;
  export let selected;
  export let pov;

  let colour = calculateStrokeColour(playerNumber);
  $: background = calculateBackgroundColour(playerNumber, selected);
  $: className = calculatePieceClassName(pov, playerNumber, pointNumber, pieceIndex);

</script>

<div class="{className}">
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="37.5" stroke={colour} stroke-width="3" fill={background} />
  </svg>
</div>

<style lang="scss">
  @import '../styles/backgammon_units.scss';

  @mixin backgammon-bar-position($position, $piece-index) {
    left: 7*$backgammon-percent-unit;

    @if $position == 'top' {
      top: (-1*$piece-index + 5)*$backgammon-vertical-percent-unit;
    }

    @if $position == 'bottom' {
      top: ($piece-index +7)*$backgammon-vertical-percent-unit;
    }
  }

  @mixin backgammon-position($point-number, $piece-index) {
    @if 1 <= $point-number and $point-number <= 12 {
      top: (($piece-index*-1)+36)*($backgammon-vertical-percent-unit/3);
    }

    @if 13 <= $point-number and $point-number <= 24 {
      top: $piece-index*$backgammon-vertical-percent-unit/3;
    }

    @if 1 <= $point-number and $point-number <= 6 {
      left: ($point-number*-1 + 14)*$backgammon-percent-unit;
    }

    @if 7 <= $point-number and $point-number <= 12 {
      left: ($point-number*-1 + 13)*$backgammon-percent-unit;
    }

    @if 13 <= $point-number and $point-number <= 18 {
      left: ($point-number - 12)*$backgammon-percent-unit;
    }

    @if 19 <= $point-number and $point-number <= 24 {
      left: ($point-number - 11)*$backgammon-percent-unit;
    }

    z-index: $piece-index+1;
  }

  @mixin backgammon-off-board-position($x-position, $y-position, $piece-index) {
    @if $x-position == 'right' {
      left: 14*$backgammon-percent-unit;
    }

    @if $x-position == 'left' {
      left: 0;
    }

    @if $y-position == 'top' {
      top: (-1*$piece-index + 20)*($backgammon-vertical-percent-unit/4);
    }

    @if $y-position == 'bottom' {
      top: ($piece-index + 28)*($backgammon-vertical-percent-unit/4);
    }

    z-index: $piece-index+1;
  }

  .piece {
    position: absolute;
    width: $backgammon-percent-unit;
    height: $backgammon-percent-unit;
    transition: top 0.5s, left 0.5s;
    transition-timing-function: ease-out;

    @for $index from 0 through 4 {
      &.position_bar_top_#{$index} {
        @include backgammon-bar-position('top', $index);
      }

      &.position_bar_bottom_#{$index} {
        @include backgammon-bar-position('bottom', $index);
      }
    }

    @for $point from 1 through 24 {
      @for $index from 0 through 9 {
        &.position_#{$point}_#{$index} {
          @include backgammon-position($point, $index);
        }
      }
    }

    @for $index from 0 through 14 {
      &.position_off_board_left_top_#{$index} {
        @include backgammon-off-board-position('left', 'top', $index);
      }

      &.position_off_board_left_bottom_#{$index} {
        @include backgammon-off-board-position('left', 'bottom', $index);
      }

      &.position_off_board_right_top_#{$index} {
        @include backgammon-off-board-position('right', 'top', $index);
      }

      &.position_off_board_right_bottom_#{$index} {
        @include backgammon-off-board-position('right', 'bottom', $index);
      }
    }
  }
</style>
