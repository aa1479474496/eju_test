
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
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>3D参数</div>
        <div class="sdisplay">
          <span class="attr-span">启用3D:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('chart.options3d.enabled', false)"
            active-text="是"
            inactive-text="否" @change="$bi.chart.setSetting('chart.options3d.enabled', $event, _this)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">内旋转角:</span>
          <input type="number" min="-45" max="45" class="attr-input" :value="$bi.chart.getSetting('chart.options3d.alpha', 0)" @blur="$bi.chart.setSetting('chart.options3d.alpha', $event.target.value, _this, 'number')">
        </div>
        <div class="sdisplay">
          <span class="attr-span">外旋转角:</span>
          <input type="number" min="-45" max="45" class="attr-input" :value="$bi.chart.getSetting('chart.options3d.beta', 0)" @blur="$bi.chart.setSetting('chart.options3d.beta', $event.target.value, _this, 'number')">
        </div>
        <div class="sdisplay">
          <span class="attr-span">深度转角:</span>
          <input type="number" min="20" max="100" class="attr-input" :value="$bi.chart.getSetting('chart.options3d.depth', 0)" @blur="$bi.chart.setSetting('chart.options3d.depth', $event.target.value, _this, 'number')">
        </div>
      </div>
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