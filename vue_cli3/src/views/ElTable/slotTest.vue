<template>
  <div>
    <el-button @click="increment">slot test</el-button>
    
    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>
    <template v-if="$slots.icon">
      <slot v-if="$slots.icon" name="icon"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1
    }
  },

  methods: {
    increment() {
      let _count = this.count;

      this.$emit("update:count", ++_count);
    }
  }
};
</script>