
<template>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图表标题</div>
    <div class="sdisplay">
      <span class="attr-span">图表标题:</span>
      <input type="text" placeholder="为空则不显示标题" class="attr-input" :value="$bi.chart.getSetting('title.text', '')" @blur="$bi.chart.setSetting('title.text', $event.target.value, _this, 'string', null)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">标题间距:</span>
      <input type="number" class="attr-input" :value="$bi.chart.getSetting('title.margin', 0)" @blur="$bi.chart.setSetting('title.margin', $event.target.value, _this, 'number')">
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('title.align', 'center')" @change="$bi.chart.setSetting('title.align', $event.target.value, _this)">
        <option value="left">左</option>
        <option value="center">中</option>
        <option value="right">右</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">垂直位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('title.verticalAlign', 'top')" @change="$bi.chart.setSetting('title.verticalAlign', $event.target.value, _this)">
        <option value="top">上</option>
        <option value="middle">中</option>
        <option value="bottom">下</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">图表副标题:</span>
      <input type="text" placeholder="为空则不显示副标题" class="attr-input" :value="$bi.chart.getSetting('subtitle.text', '')" @blur="$bi.chart.setSetting('subtitle.text', $event.target.value, _this)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('subtitle.align', 'center')" @change="$bi.chart.setSetting('subtitle.align', $event.target.value, _this)">
        <option value="left">左</option>
        <option value="center">中</option>
        <option value="right">右</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">垂直位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('subtitle.verticalAlign', 'top')" @change="$bi.chart.setSetting('subtitle.verticalAlign', $event.target.value, _this)">
        <option value="top">上</option>
        <option value="middle">中</option>
        <option value="bottom">下</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">标签显示:</span> 
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('plotOptions.series.dataLabels.enabled', false)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('plotOptions.series.dataLabels.enabled', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">标签竖排:</span> 
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('plotOptions.series.dataLabels.rotation', 0)==-90?true:false"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('plotOptions.series.dataLabels.rotation', $event?-90:0, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">标签位置:</span>  
      <input type="number" class="attr-input" :value="$bi.chart.getSetting('plotOptions.series.dataLabels.y', 0)" @blur="$bi.chart.setSetting('plotOptions.series.dataLabels.y', $event.target.value, _this, 'number')">
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
};
</script>