
<template>
  <div>
    <attrCommon>
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>参数设置</div>
        <div class="sdisplay">
          <span class="attr-span">堆叠方式:</span>
          <select class="attr-select" :value="$bi.chart.getSetting('plotOptions.column.stacking', '')" @change="$bi.chart.setSetting('plotOptions.column.stacking', $event.target.value, _this);$bi.chart.setSetting('plotOptions.spline.stacking', $event.target.value, _this)">
            <option v-for="(option,index) in stackings" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
      </div>
      <attrTitle></attrTitle>
      <attrAxis></attrAxis>
      <attrLegend></attrLegend>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import attrAxis from '@/components/chart/attr/hcharts/attrAxis';
import attrLegend from '@/components/chart/attr/hcharts/attrLegend';
import attrTitle from '@/components/chart/attr/hcharts/attrTitle';
import defaultStyle from '@/config/style';
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
      ]
    };
  },
  components: {
    attrCommon,
    attrAxis,
    attrLegend,
    attrTitle,
    attrOption
  },
  computed: {
    _this() {
      return this;
    }
  }
}
</script>