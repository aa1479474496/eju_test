<template>
  <timeLine :items='items' :options="options"></timeLine>
</template>
<script>
import timeLine from "@/components/common/bi-timeLine.vue";
export default {
  computed: {
    items() {
      return this.itemData.data.fileList;
    },
    options() {
      return this.itemData.data.options;
    }
  },
  props: {
    mode: String,
    itemData: Object
  },
  components: {
    timeLine
  }
};
</script>