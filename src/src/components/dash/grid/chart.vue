<template>
<div class="g_fullAbs" 
  v-loading="chartInfo==null" 
  element-loading-background="#191a2c"
  element-loading-text="拼命加载中...">
  <chartMain :chartInfo="chartInfo" v-if="status"></chartMain>
</div>
</template>

<script>
import "@/components/chart/init";
import chartMain from "@/components/chart/com/chartMain";
import api from "@/server/api";
export default {
  data() {
    return {
      chartInfo: null,
      status:false
    };
  },
  props: {
    mode: String,
    itemData: Object
  },
  created() {
    this.loadInfo();
  },
  watch: {
    "itemData.data.cid"(val) {
      this.loadInfo();
    }
  },
  mounted() {
    window.dispatchEvent(new Event("resize"));
  },
  components: {
    chartMain
  },
  methods: {
    loadInfo() {
      bi.chart.loadData(this.itemData.data.cid, res => {
        console.log("load chart data id:" + this.itemData.data.cid);
        this.chartInfo = res;
        this.status =true;
      });
    }
  }
};
</script>