<script>
// /Users/zsn/Documents/ejuWork/project/dms_report/src/components/report/chart/chart/item.vue
import Vue from "vue";
export default {
  data() {
    return {};
  },
  props: {
    chartInfo: Object,
    isnav: {
      type: Boolean,
      default: false
    }
  },
  render: function(createElement) {
    let { type } = this.chartInfo.data;
    let _module = {};
    let _node = {};
    if ((type != "table" || type != 'text') && this.isnav) {
      _module = require("@/components/report/chart/chart/chartnav.vue");
      _node = { name: 'chartnav' }
    } else {
      let _conf = bi.chart.components[type];
      _node = _conf["chart"] || { name: type + "chart", file: type };
      _module = require("@/components/report/chart/chart/" + _node.file);
    }

    // debugger;
    Vue.component(_node.name, _module.default);

    return createElement(_node.name, {
      props: {
        chartInfo: this.chartInfo,
        isnav: this.isnav
      }
    });
  }
};
</script>
