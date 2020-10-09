<template>
  <div :style="chartStyle">
    <img :src="chartInfo.presrc" alt="">
  </div>
</template>

<script>
// add
// /Users/zsn/Documents/ejuWork/project/dms_report/src/components/report/chart/chart/chartnav.vue
export default {
  name: 'chartnav',
  props: {
     chartInfo: Object
  },

  computed: {
    chartStyle() {
      let style = {
        width: '100%',
        height: this.chartInfo.h + "px"
      };
      return style;
    }
  }
}
</script>