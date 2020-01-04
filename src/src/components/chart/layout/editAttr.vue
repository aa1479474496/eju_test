<template>
  <div>
    <chartAttr v-if="chartInfo.status"></chartAttr>
  </div>
</template>

<script>
import chartAttr from '@/components/chart/com/chartAttr';
export default {
  data() {
    return {
      chartInfo: bi.chart
    };
  },
  components: {
    chartAttr
  }
};
</script>
