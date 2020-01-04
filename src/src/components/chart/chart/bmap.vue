<template>
  <div :class="'chart-box-wrap chart-theme-' + chartInfo.data.theme">
    
  </div>
</template>

<script>
import '@/components/common/amap';
export default {
  data() {
    return {
    };
  },
  props: {
    chartInfo: Object
  },
  created() {
  },
  computed: {
  }
};
</script>