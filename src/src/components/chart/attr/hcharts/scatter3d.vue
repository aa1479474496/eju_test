
<template>
  <div>
    <attrCommon>
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
          <span class="attr-span">外旋转角:</span>
          <input type="number" min="-45" max="45" class="attr-input" :value="$bi.chart.getSetting('chart.options3d.beta', 0)" @blur="$bi.chart.setSetting('chart.options3d.beta', $event.target.value, _this, 'number')">
        </div>
        <div class="sdisplay">
          <span class="attr-span">深度转角:</span>
          <input type="number" min="20" max="100" class="attr-input" :value="$bi.chart.getSetting('chart.options3d.depth', 0)" @blur="$bi.chart.setSetting('chart.options3d.depth', $event.target.value, _this, 'number')">
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