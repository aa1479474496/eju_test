<template>
<div :id="chartid" class="g_fullAbs"/>
</template>

<script>
import Highcharts from "highcharts";
window.Highcharts = Highcharts;
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/funnel")(Highcharts);
require("highcharts/modules/wordcloud")(Highcharts);
require("highcharts/modules/treemap")(Highcharts);
require("highcharts/modules/sankey")(Highcharts);
export default {
  props: {
    options: Object,
    theme: String,
    chartid: String
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    options: {
      deep: true,
      handler: function(val, old) {
        this.updateChart();
      }
    },
    theme(val, old) {
      // this.updateTheme();
    }
  },
  methods: {
    initChart() {
      if (!this.chart) {
        //console.log('initChart..............................');
        this.chart = Highcharts.chart(this.chartid, this.options);
      }
    },
    updateChart() {
      if (this.options) {
        //console.log('updateChart..............................');
        //this.chart.update(this.options);
        this.chart = Highcharts.chart(this.chartid, this.options);
      }
    },
    updateTheme() {
      // if (this.options && this.chart) {
      //   if (this.chart) {
      //     this.chart.destroy();
      //   }
      //   this.chart = Highcharts.chart(this.chartid, this.options);
      // }
    },
    lazyLoading() {
      let windowHeight =
        document.documentElement.clientHeight || window.innerHeight;
      // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // let windowBottom = +scrollTop + +windowHeight;
      let selfTop = this.$el.getBoundingClientRect().top;
      let selfBottom = this.$el.getBoundingClientRect().bottom;
      let selfwidth = this.$el.getBoundingClientRect().width;
      if (windowHeight >= selfTop + 50 && !!selfwidth && this.options) {
        if (this.chart) {
          this.chart.update(this.options);
        } else {
          this.initChart();
        }
      }
    }
  },
  mounted() {
    window.addEventListener(
      "scroll",
      () => {
        this.lazyLoading();
      },
      1000
    );
    this.$nextTick(() => {
      this.lazyLoading();
    });
  }
};
</script>