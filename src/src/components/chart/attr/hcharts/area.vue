
<template>
  <div>
    <attrCommon>
        <div class="oneblock">
          <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>参数设置</div>
          <div class="sdisplay">
            <span class="attr-span">画线方式:</span>
            <select class="attr-select" :value="$bi.chart.getSetting('chart.type', 'area')" @change="$bi.chart.setSetting('chart.type', $event.target.value, _this)">
              <option v-for="(option,index) in ctypes" :value="option.value" :key="index">{{ option.name }}</option>
            </select>
          </div>
          <div class="sdisplay">
            <span class="attr-span">线条类型:</span>
            <select class="attr-select" :value="$bi.chart.getSetting('plotOptions.series.dashStyle', 'Solid')" @change="$bi.chart.setSetting('plotOptions.series.dashStyle', $event.target.value, _this, 'string')">
              <option v-for="(option,index) in ltypes" :value="option.value" :key="index">{{ option.name }}</option>
            </select>
          </div>
          <div class="sdisplay">
            <span class="attr-span">堆叠方式:</span>
            <select class="attr-select" :value="$bi.chart.getSetting('plotOptions.area.stacking', '')" @change="$bi.chart.setSetting('plotOptions.area.stacking', $event.target.value, _this);$bi.chart.setSetting('plotOptions.areaspline.stacking', $event.target.value, _this)">
              <option v-for="(option,index) in stackings" :value="option.value" :key="index">{{ option.name }}</option>
            </select>
          </div>
        </div>
        <attrTitle></attrTitle>
        <attrAxis></attrAxis>
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
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      stackings: defaultStyle.chartStackings,
      ctypes: [
        { name: "直线", value: "area" },
        { name: "曲线", value: "areaspline" },
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
  }
}
</script>