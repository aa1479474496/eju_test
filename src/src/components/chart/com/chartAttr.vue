<script>
import Vue from 'vue'
export default {
  data() {
    return {
    };
  },
  render: function(createElement) {
    let _type = bi.chart.data.type;
    let _conf = bi.chart.components[_type];
    let _node = bi.chart.components[_type]["attr"] || {name: _type + "Attr", file: _type};
    let _module = require ("@/components/chart/attr/" + _node.file);
    bi.log("createChartItem:" + _type + ":" + _node.name);

    Vue.component(_node.name, _module.default);

    return createElement(_node.name, {
      props: {
      }
    });
  }
};
</script>