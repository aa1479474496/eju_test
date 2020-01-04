<template>
      <div class="g_c_mapSelectDown"> 
         <slot name="icon" class="icon"></slot>
          <select  @change="$emit('triggermodel', $event.target.value)">
              <slot></slot>
          </select>
      </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props: ["value"],
  model: {
    prop: "value",
    event: "triggermodel"
  }
};
</script>
