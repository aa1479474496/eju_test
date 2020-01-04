
<template>
  <div>
    <attrCommon>
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>参数设置</div>
        <div class="sdisplay">
          <span class="attr-span">线条类型:</span>
          <select class="attr-select" :value="$bi.chart.getSetting('plotOptions.series.dashStyle', 'Solid')" @change="$bi.chart.setSetting('plotOptions.series.dashStyle', $event.target.value, _this, 'string')">
            <option v-for="(option,index) in ltypes" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
      </div>
      <attrTitle></attrTitle>
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>坐标轴</div>
        <div class="sdisplay">
          <span class="attr-span">图表缩放:</span>
          <select class="attr-select" :value="$bi.chart.getSetting('chart.zoomType', '')" @change="$bi.chart.setSetting('chart.zoomType', $event.target.value, _this)">
            <option v-for="(option,index) in zoomTypes" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
        <div class="sdisplay">
          <span class="attr-span">交换XY轴:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('chart.inverted', false)"
            active-text="是"
            inactive-text="否" @change="$bi.chart.setSetting('chart.inverted', $event, _this, 'boolean', false)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">Y轴类型:</span>
          <select class="attr-select" :value="$bi.chart.getSetting('yAxis.type', 'linear')" @change="$bi.chart.setSetting('yAxis.type', $event.target.value, _this)">
            <option v-for="(option,index) in ytypes" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
        <div class="sdisplay">
          <span class="attr-span">Y轴排序:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('yAxis.reversed', false)"
            active-text="升序"
            inactive-text="降序" @change="$bi.chart.setSetting('yAxis.reversed', $event, _this, 'boolean', false)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">Y轴单位:</span>
          <input type="text" placeholder="为空则不显示Y轴单位" class="attr-input" :value="$bi.chart.getSetting('tooltip.valueSuffix', '')" @blur="setUnit($event.target.value)">
        </div>
        <div class="sdisplay">
          <span class="attr-span">X轴标题:</span>      
          <input type="text" placeholder="为空则不显示X轴标题" class="attr-input" :value="$bi.chart.getSetting('xAxis.title.text', '')" @blur="$bi.chart.setSetting('xAxis.title.text', $event.target.value, _this, 'string', null)">
        </div>
        <div class="sdisplay">
          <span class="attr-span">X轴排序:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('xAxis.reversed', false)"
            active-text="升序"
            inactive-text="降序" @change="$bi.chart.setSetting('xAxis.reversed', $event, _this, 'boolean', false)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">X轴位置:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('xAxis.opposite', false)"
            active-text="上边"
            inactive-text="下边" @change="$bi.chart.setSetting('xAxis.opposite', $event, _this, 'boolean', false)">
          </el-switch>
        </div>
      </div>
      <attrLegend></attrLegend>
      <setcolor slot="colorlist" :colorption="colorption"></setcolor>
      <setColorDialog slot="colordialog" v-if="colorption.show" :colorption="colorption"></setColorDialog>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import attrAxis from '@/components/chart/attr/hcharts/attrAxis';
import attrLegend from '@/components/chart/attr/hcharts/attrLegend';
import attrTitle from '@/components/chart/attr/hcharts/attrTitle';
import setcolor from '@/components/chart/attr/setcolor';
import setColorDialog from '@/components/chart/dialog/setColor';
import defaultStyle from '@/config/style'
export default {
  data() {
    return {
      stackings: defaultStyle.chartStackings,
      ctypes: [
        { name: "直线", value: "line" },
        { name: "曲线", value: "spline" },
      ],
      ltypes: [
        { name: "Solid", value: "Solid" },
        { name: "ShortDash", value: "ShortDash" },
        { name: "ShortDot", value: "ShortDot" },
        { name: "ShortDashDotDot", value: "ShortDashDotDot" },
        { name: "Dot", value: "Dot" },
        { name: "Dash", value: "Dash" },
        { name: "LongDash", value: "LongDash" },
        { name: "DashDot", value: "DashDot" },
        { name: "LongDashDot", value: "LongDashDot" },
        { name: "LongDashDotDot", value: "LongDashDotDot" },
      ],
      ytypes: [
        { name: "数值", value: "linear" },
        { name: "对数", value: "logarithmic" },
        { name: "时间", value: "datetime" }
      ],
      zoomTypes: [
        { name: "不缩放", value: "" },
        { name: "X轴缩放", value: "x" },
        { name: "Y轴缩放", value: "y" },
        { name: "XY轴缩放", value: "xy" }
      ],
      colorption: { show: false }
    };
  },
  components: {
    attrCommon,
    attrAxis,
    attrLegend,
    attrTitle,
    attrOption,
    setcolor,
    setColorDialog,
  },
  computed: {
    _this() {
      return this;
    }
  },
  methods: {
    setUnit(val) {
      let _labelsFormat = '';
      // let _pointFormat = '';
      if (val != '') {
        //_pointFormat = '{series.name}: <b>{point.y}</b>' + val;
        _labelsFormat = '{value}' + val + '';
      }
      bi.chart.setSetting('yAxis.labels.format', _labelsFormat, this);
      bi.chart.setSetting('tooltip.valueSuffix', val, this);
    }
  }
}
</script>