<template>
  <echarts 
    ref="echarts"
    :options="options" 
    :theme="chartTheme" 
    auto-resize 
    class="chart-box-wrap"></echarts>
</template>

<script>
import echarts from '@/components/common/vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import 'echarts-liquidfill';
// Map of China
// registering map data
import 'echarts/lib/component/geo';
import chinaMap from '@/config/china.json';
echarts.registerMap("china", chinaMap);

import optionCompile from '@/components/chart/com/compile'
export default {
  data() {
    return {
      watchShallow: true
    };
  },
  props: {
    chartInfo: Object
  },
  computed: {
    options() {
      let _option = optionCompile.run(this.chartInfo);
      // 交换XY轴
      if (_option.chart && _option.chart.inverted) {
        let _tmp = _option.xAxis;
        _option.xAxis = _option.yAxis;
        _option.yAxis = _tmp;
      }
      // console.log(_option);
      let _animate = {
        animationDuration: 1300,
        animationDelay: 0,
        animationDurationUpdate: 1300,
        animationDelayUpdate:  0
      }
      Object.assign(_animate,_option);
      return _animate;
    },
    chartTheme() {
      return bi.dash.getTheme();
    }
  },
  mounted() {
    window.dispatchEvent(new Event("resize"));
  },
  components: {
    echarts
  },
};
</script>
