
<template>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图例设置</div>
    <div class="sdisplay">
      <span class="attr-span">是否显示:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('legend.enabled', true)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('legend.enabled', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('legend.align', 'center')" @change="$bi.chart.setSetting('legend.align', $event.target.value, _this)">
        <option value="left">左</option>
        <option value="center">中</option>
        <option value="right">右</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">布局方式:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('legend.layout', 'horizontal')" @change="$bi.chart.setSetting('legend.layout', $event.target.value, _this)">
        <option value="horizontal">水平布局</option>
        <option value="vertical">垂直布局</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">是否浮动:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('legend.floating', false)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('legend.floating', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平偏移:</span>
      <input type="number" placeholder="为空则使用默认值" class="attr-input" :value="$bi.chart.getSetting('legend.x', '')" @blur="$bi.chart.setSetting('legend.x', $event.target.value, _this, 'number')">
    </div>
    <div class="sdisplay">
      <span class="attr-span">竖直偏移:</span>
      <input type="number" placeholder="为空则使用默认值" class="attr-input" :value="$bi.chart.getSetting('legend.y', '')" @blur="$bi.chart.setSetting('legend.y', $event.target.value, _this, 'number')">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    _this() {
      return this;
    }
  }
}
</script>