<template>
 <div class="chart-main-wrap" ref="chartheight"
    v-loading="chartInfo==null" 
    element-loading-background="#191a2c"
    element-loading-text="拼命加载中...">
    <div class="chart-nodata" v-if="chartInfo==null">&nbsp;</div>
    <div v-else>
      <div class="chart-filter-box" v-if="hasFilter || hasQoption">
        <select class="chart-select" v-if="hasFilter"
          v-for="(item,index) in chartInfo.data.filters2" :key="index"  
          @change="fliterChartData(item, $event)">
          <option value="">{{item.title}}</option>
          <option v-for="(value,key) in item.data" :selected="value==chartInfo.data.query.filters2[item.field]" :key="key" :value="value">{{value}}</option>
        </select>
        <select class="chart-select" v-if="hasQoption" v-model="chartInfo.data.qovalue">
          <option v-for="(value,key) in chartInfo.data.qoption" 
            :key="key" :value="value.field">{{value.name}}</option>
        </select>
      </div>
      <chartItem v-if="hasData" :chartInfo="chartInfo"></chartItem>
      <div v-else class="chart-nodata">暂无数据</div>
    </div>
 </div>
</template>

<script>
import chartItem from "@/components/chart/com/chartItem";
import api from "@/server/api";
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    chartInfo: Object,
    doOperate:{
      type:Object,
      default(){
        return {
          status:true
        }
      }
    }
  },
  computed: {
    hasData() {
      return this.chartInfo && this.chartInfo.list && this.chartInfo.list.length > 0;
    },
    hasFilter() {
      return this.chartInfo && this.chartInfo.data && this.chartInfo.data.filters2 && this.chartInfo.data.filters2.length > 0;
    },
    hasQoption() {
      return this.chartInfo && this.chartInfo.data && this.chartInfo.data.qoption && this.chartInfo.data.qoption.length > 0;
    },
    optionList() {
      return '';
    }
  },
  components: {
    chartItem
  },
  watch: {
    'chartInfo.data.query': {
      deep: true,
      immediate: true,
      handler(val, old) {
        if (!this.chartInfo.status || !this.doOperate.status) {
          return false;
        }
        this.getChartData();
      }
    },
  },
  methods: {
    fliterChartData(item, event) {
      // this.chartInfo.data.query.filters2[item] = event.target.value;
      if (item.field == event.target.value) {
        delete this.chartInfo.data.query.filters2[item.field];
      } else {
        this.$set(
          this.chartInfo.data.query.filters2,
          item.field,
          event.target.value
        );
      }
    },
    getChartData() {
      let _query = this.chartInfo.data.query;
      if (
        _query.db == "" ||
        _query.tbl == "" ||
        _query.fields1.length + _query.fields2.length == 0
      ) {
        return false;
      }

      this.loading = true;
      _query.cid = this.chartInfo.id;
      api.query(_query).then(res => {
        this.chartInfo.list.length = 0;
        this.loading = false;
        if (res.status) {
          this.chartInfo.list.push(...res.data.aList);
          this.chartInfo.lasttime = res.data.iLastTime;
        } else {
          // TODO 不加这句不会触发数据变化
          this.chartInfo.list.push(...[]);
          bi.log("api.query error:" + res.data);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-main-wrap {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  .chart-filter-box {
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 999;
    display: inline-block;
    background-color: #131c26;
    color: rgba(255, 255, 255, 0.7);
    border-radius: 15px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    padding: 0 12px;
    .chart-select {
      background: #131c26 url("../../../assets/triangle-down.svg") right center no-repeat;
      outline: 0;
      box-shadow: none;
      color: rgba(255, 255, 255, 0.7);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin-top: -5px;
      border: 0;
      padding: 0 24px 0 0;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .chart-nodata {
    position: absolute;
    width: 150px;
    height: 25px;
    text-align: center;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    margin: auto;
  }
}
</style>

