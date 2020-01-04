<template>
  <div>
    <back-header head-title="编辑图表" go-back='true'></back-header>
    <div class="chart-edit-container">
      <editTable ref="edittable" :doOperate="doOperate"></editTable>

      <div class="chart-edit-main"><!--中间区域 -->
        <editField ref="editfield" :doOperate="doOperate"></editField>   
        <editBox ref="editbox" :doOperate="doOperate" v-if="doOperate.status"></editBox>
        <div class="initload" v-if="!doOperate.status" v-loading="!doOperate.status"  element-loading-background="transparent"  element-loading-text="拼命加载中..."></div>
      </div>

      <!--右侧区域 -->
      <editAttr ref="editattr"></editAttr>
    </div>
  </div>
</template>

<script>
import '@/style/default/chartEdit';
import '@/style/theme/black/chart';
import '@/components/chart/init';
import '@/components/dash/init';
import backHeader from '@/components/common/backHeader';
import editTable from '@/components/chart/layout/editTable'
import editField from '@/components/chart/layout/editField'
import editBox from '@/components/chart/layout/editBox'
import editAttr from '@/components/chart/layout/editAttr'
import api from '@/server/api'
export default {
  components: {
    backHeader,
    editTable,
    editField,
    editBox,
    editAttr
  },
  data() {
    bi.chart.id = this.$route.params.id;
    return {
      saveTimer: 0,
      queryTimer: 0,
      loading: false,
      doOperate:{
        status:false,
        type:bi.chart.data.type
      },
      chartInfo: bi.chart
    };
  },
  created() {
    bi.dash.loadTheme();
    this.getChartInfo();
  },
  watch: {
    'chartInfo.data': {
      deep: true,
      handler(val, old) {
        if (! bi.chart.status) {
          return false;
        }
        let _this = this;
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(function() {
          _this.saveChartInfo();
        }, 1000);
      }
    }
  },
  methods: {
    getChartInfo() {
      let _this = this;
      bi.chart.status = false;
      _this.doOperate.status=false;
      bi.chart.loadData(bi.chart.id, function(_chartInfo) {
        Object.assign(bi.chart.data, _chartInfo.data);
        delete _chartInfo.data;
        Object.assign(bi.chart, _chartInfo);
        _this.doOperate.status=true;
        setTimeout(function(){
          bi.chart.status = true;
        }, 500);
      });
    },
    saveChartInfo() {
      let _this =this;
      bi.log("save chart: " + bi.chart.id);
      api.chartSave(
        bi.chart.id,
        bi.chart.name,
        this.chartInfo.data
      ).then(res => {
         _this.doOperate.status=true;
        if (!res.status) {
          bi.log("api.chartSave error:" + res.data);
        }
      });
    },
  }
};
</script>