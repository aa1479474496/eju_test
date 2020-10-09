<template>
  <echarts
    ref="echarts"
    :options="options"
    :theme="theme"
    :autoResize="true"
    :style="chartStyle"
    class="chart-box-wrap"
    @legendselectchanged="legendChg"
    :unLegend="unLegend"
  ></echarts>
</template>

<script>
// /Users/zsn/Documents/ejuWork/project/dms_report/src/components/report/chart/chart/echarts.vue
import echarts from "@/components/report/chart/com/vue-echarts.vue";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/title";
import "echarts/lib/component/geo";
import "echarts/lib/component/graphic";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/markLine";


import optioncompile from "@/components/report/chart/com/compile.js";
export default {
  data() {
    return {
      watchShallow: true,
      lastmd5: "",
      options: {},
      theme: "",
      unLegend:[]
    };
  },

  props: {
    chartInfo: Object
  },

  watch: {
    "chartInfo.data": {
      handler(data) {
        console.log("change chartInfo.data .....");
        this.setOptions(data);
      },
      immediate: true,
      deep: true
    },
    "chartInfo.w": {
      handler(data) {
        console.log("change chartInfo.w .....");
        if (bi.chart.getSetting('enableDataTable', false) === true){
          this.setOptions(this.chartInfo.data,true);
        }
      },
      immediate: true,
      deep: true
    },
    "chartInfo.h": {
      handler(data) {
        console.log("change chartInfo.h .....");
        if (bi.chart.getSetting('enableDataTable', false) === true){
          this.setOptions(this.chartInfo.data,true);
        }
      },
      immediate: true,
      deep: true
    },
    "$bi.dash.data.attr": {
      handler(data) {
        //console.log("change chartInfo.theme .....", newtheme, oldtheme, this.theme);
        if (data.theme != this.theme) {
          this.setOptions(this.chartInfo.data);
        }
      },
      deep: true
    }
  },
  methods: {
    setOptions(data,force = false) {
      if (data.list.length == 0) {
        return {};
      }

      let _theme = bi.dash.data.attr.theme || "";
      let _lastmd5 = bi.md5(JSON.stringify(data)) + _theme;
      if (_lastmd5 == this.lastmd5 && !force) {
        console.log("chartdata nochange", _lastmd5);
        return this.options;
      }

      this.lastmd5 = _lastmd5;
      let _option = optioncompile.run(data, this.chartInfo.w, this.chartInfo.h);
      _option.animation = false;
      //   console.log('_option:', _option, data);

      // this.options = {
      //   animationDuration: 1300,
      //   animationDelay: 0,
      //   animationDurationUpdate: 1300,
      //   animationDelayUpdate: 0,
      //   ..._option
      // };

      this.unLegend = data.custom ? (data.custom.unLegend || []) :[];
      this.options = _option;
      this.theme = bi.dash.data.attr.theme || "";

      // let img = this.getDataURL(_option);
      setTimeout(() => {
        if (this.$refs.echarts && this.$refs.echarts.getDataURL) {
        this.chartInfo.presrc = this.$refs.echarts.getDataURL(this.options);
        console.log('------', this.chartInfo);
      // console.log('iiiiiiii', img);
      }
      }, 1000);
      
      
      return this.options;
    },
    legendChg(parmas){
      this.chartInfo.data.custom = this.chartInfo.data.custom || {};
      this.chartInfo.data.custom.unLegend = [];
      let unLegend = this.chartInfo.data.custom.unLegend;
      Object.keys(parmas.selected).forEach(function(key){
        if (!parmas.selected[key]){
          unLegend.push(key);
        }
      });

    }
  },
  computed: {
    chartStyle() {
      let style = {
        width: this.chartInfo.w + "px",
        height: this.chartInfo.h + "px"
      };
      if (
        this.chartInfo.innercss &&
        this.chartInfo.innercss.borderStyle !== "none" &&
        this.chartInfo.innercss.borderWidth
      ) {
        style.width =
          this.chartInfo.w - this.chartInfo.innercss.borderWidth * 2 + "px";
        style.height =
          this.chartInfo.h - this.chartInfo.innercss.borderWidth * 2 + "px";
      }
      return style;
    }
  },

  mounted() {
    console.log('mmmmmmmmmmmmmm');
    window.dispatchEvent(new Event("resize"));

    // console.log('ttttttt', this);
  },

  components: {
    echarts
  }
};
</script>
