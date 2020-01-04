<script>
import Vue from 'vue'
export default {
  data() {
    return {
    };
  },
  props: {
    chartInfo: Object
  },
  render: function(createElement) {
      let _type = this.chartInfo.data.type;
      let _conf = bi.chart.components[_type];
      let _node = _conf['chart'] || {name: _type + 'Chart', file: _type};
      let _module = require ('@/components/chart/chart/' + _node.file);
      bi.log('createChartItem:' + _type + ':' + _node.name);

      // 初始化主题
      Vue.component(_node.name, _module.default);
      
      return createElement(_node.name, {
        props: {
          chartInfo: this.chartInfo
        }
      });
  }
};
</script>