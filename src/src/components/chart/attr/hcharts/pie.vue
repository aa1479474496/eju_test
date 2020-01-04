
<template>
  <div>
    <attrCommon>
      <div class="oneblock">
        <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>参数设置</div>
        <div class="sdisplay">
          <span class="attr-span">显示图例:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('plotOptions.pie.showInLegend', false)"
            active-text="是"
            inactive-text="否" @change="$bi.chart.setSetting('plotOptions.pie.showInLegend', $event, _this)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">点击选中:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('plotOptions.pie.allowPointSelect', false)"
            active-text="是"
            inactive-text="否" @change="$bi.chart.setSetting('plotOptions.pie.allowPointSelect', $event, _this)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">显示标签:</span>
          <el-switch class="attr-input"
            :value="$bi.chart.getSetting('plotOptions.pie.dataLabels.enabled', true)"
            active-text="是"
            inactive-text="否" @change="$bi.chart.setSetting('plotOptions.pie.dataLabels.enabled', $event, _this)">
          </el-switch>
        </div>
        <div class="sdisplay">
          <span class="attr-span">环形图:</span>
          <input type="text" placeholder="为空则为实心圆" class="attr-input" :value="$bi.chart.getSetting('plotOptions.pie.innerSize', '0%')" @blur="$bi.chart.setSetting('plotOptions.pie.innerSize', $event.target.value, _this)">
        </div>
      </div>
      <attrTitle></attrTitle>
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
          <span class="attr-span">深度:</span>
          <input type="number" min="20" max="100" class="attr-input" :value="$bi.chart.getSetting('plotOptions.pie.depth', 0)" @blur="$bi.chart.setSetting('plotOptions.pie.depth', $event.target.value, _this, 'number')">
        </div>
      </div>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import attrOption from '@/components/chart/attr/option';
import attrAxis from '@/components/chart/attr/hcharts/attrAxis';
import attrLegend from '@/components/chart/attr/hcharts/attrLegend';
import attrTitle from '@/components/chart/attr/hcharts/attrTitle';
export default {
  data() {
    return {
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