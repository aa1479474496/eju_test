<template>
  <div id="chart-box" :style="{top: toppx }">
    <div class="chart-edit-type axis">
       <edit-chart-type :chart-type="chartInfo.data.type" :doOperate="doOperate"></edit-chart-type>
    </div>
    <chartMain :style="{top:charttop}"  :chartInfo="chartInfo" :doOperate="doOperate" class="chart-edit-wrap"></chartMain>
  </div>
</template>

<script>
import chartMain from "@/components/chart/com/chartMain";
import editChartType from "@/components/chart/layout/chartType";
import api from "@/server/api";
export default {
  data() {
    return {
      chartInfo: bi.chart,
      toppx: "96px !important"
    };
  },
  mounted() {
    var _this = this;
    window.onresize = () => {
      return _this.toppxfn();
    };
    _this.toppxfn();
  },
  computed: {
    charttop() {
      return "55px !important";
    }
  },
  components: {
    chartMain,
    editChartType
  },
  props:{
    doOperate:Object
  },
  methods: {
    toppxfn() {
      let _this = this;
      this.$nextTick(() => {
         _this.toppx =_this.$el.previousElementSibling && _this.$el.previousElementSibling.clientHeight + "px !important";
      });
    }
  }
};
</script>