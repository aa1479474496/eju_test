<template >
<ul class="line-container" :style="{color:options.fontcolor,transform:getTransform(options.zoom)}">
    <li class="line-item" v-for="(item,index) in  items" :key="index">
        <div class="item-circle" :class="getColorClass(item.color)" :style="getStyle(item)"></div>
        <div class="item-tag">{{item.date}}</div>
        <div class="item-content" >{{item.content}}</div>
    </li>
</ul>
</template>
<script>
export default {
  name: "light-timeline",
  props: {
    items: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      presetReg: /purple|orange|yellow/
    };
  },
  methods: {
    getColorClass(color) {
      return this.presetReg.test(color) ? color : "";
    },
    getStyle(item) {
      const color = item.color;
      if (!this.presetReg.test(color)) {
        return this.makeCircleColor(color);
      }
      return {};
    },
    makeCircleColor(color) {
      return { border: `2px solid ${color}` };
    },
    getTransform(zoom) {
      if (zoom == 1) {
        return `scale(1) translate(0,0)`;
      } else if (zoom == 2) {
        return `scale(${zoom}) translate(25%,30%)`;
      } else if (zoom == 3) {
        return `scale(${zoom}) translate(32%,40%)`;
      } else if (zoom == 4) {
        return `scale(${zoom}) translate(37%,50%)`;
      } else {
        return `scale(1) translate(0,0)`;
      }
    }
  }
};
</script>
<style lang="scss">
$purple: #8b80f9;
$orange: #ed9153;
$yellow: #fbd157;
$font-size: 16px;
$left-pad: 10rem;
$item-pad: 1rem;
$icon-size: 16px;
$sm-icon-size: 10px;
$lg-icon-size: 24px;

$colors: (
  purple: $purple,
  orange: $orange,
  yellow: $yellow
);

@mixin square($val) {
  width: $val;
  height: $val;
}
@mixin circle($diameter, $color) {
  @include square($diameter);
  border-radius: $diameter/2 + 2px;
  background: white;
  border: 2px solid $color;
  top: 1.2rem;
}
@mixin line-point($val) {
  box-sizing: border-box;
  position: absolute;
  left: -$item-pad;
  margin-left: -($val/2) + 1px;
  z-index: 1;
}
@mixin make-circle($diameter, $color) {
  @include line-point($diameter);
  @include circle($diameter, $color);
}
@mixin make-star($val, $color) {
  @include line-point($val);
  @include square($val);
  margin-top: -($val/6);
  path {
    stroke: $color;
    stroke-width: 4px;
    fill: white;
  }
}
:root {
  --purple: $purple;
  --orange: $orange;
  --yellow: $yellow;
}
.line-container {
  font-size: $font-size;

  box-sizing: border-box;
  position: relative;
  list-style: none;
  margin: 0.5rem;
  padding-left: $left-pad + 1rem;
  vertical-align: middle;
  &::after {
    position: absolute;
    content: "";
    left: $left-pad;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: lighten($purple, 20%);
  }
  .line-item {
    padding: $item-pad;
    position: relative;
  }
  .item-circle {
    @include make-circle($icon-size, $purple);
    @each $key, $val in $colors {
      &.#{$key} {
        border: 2px solid $val;
      }
    }
  }
  .item-tag {
    position: absolute;
    left: -($left-pad + 1rem);
    width: 120px;
    text-align: right;
    vertical-align: middle;
  }
  .item-content {
    white-space: pre-line;
    &.star {
      font-weight: bold; // font-size: $font-size * 1.1;
    }
  }
}
</style>

s