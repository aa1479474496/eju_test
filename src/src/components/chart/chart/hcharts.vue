<template>
  <hcharts 
    :options="options" 
    :theme="chartInfo.data.theme" 
    :chartid="'hchart-vue-'+chartInfo.id"
    class="chart-box-wrap"></hcharts>
</template>

<script>
import hcharts from "@/components/common/vue-hcharts";
import optionCompile from "@/components/chart/com/compile";
export default {
  data() {
    return {};
  },
  props: {
    chartInfo: Object
  },
  computed: {
    options() {
      let _option = optionCompile.run(this.chartInfo);

      // 处理主题
      let _theme = bi.dash.getTheme();
      let _themeOptions = bi.copy(bi.dash.highthemes[_theme] || {});
      bi.deepMerge(_themeOptions, _option);

      return _themeOptions;
    }
  },
  components: {
    hcharts
  }
};
</script>
