<template>
  <div>
    slot test
    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>
    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template>
  </div>
</template>

<script>
export default {};
</script>