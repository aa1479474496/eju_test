
<template>
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
      <span class="attr-span">Y轴位置:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('yAxis.opposite', false)"
        active-text="左边"
        inactive-text="右边" @change="$bi.chart.setSetting('yAxis.opposite', $event, _this, 'boolean', false)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴最小值:</span>
      <input type="number" placeholder="为空则自动计算" class="attr-input" :value="$bi.chart.getSetting('yAxis.min', '')" @blur="$bi.chart.setSetting('yAxis.min', $event.target.value, _this, 'number')">
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴最大值:</span>
      <input type="number" placeholder="为空则自动计算" class="attr-input" :value="$bi.chart.getSetting('yAxis.max', '')" @blur="$bi.chart.setSetting('yAxis.max', $event.target.value, _this, 'number')">
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴标题:</span>
      <input type="text" placeholder="为空则不显示Y轴标题" class="attr-input" :value="$bi.chart.getSetting('yAxis.title.text', '')" @blur="$bi.chart.setSetting('yAxis.title.text', $event.target.value, _this, 'string', null)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴单位:</span>
      <input type="text" placeholder="为空则不显示Y轴单位" class="attr-input" :value="$bi.chart.getSetting('tooltip.valueSuffix', '')" @blur="setUnit($event.target.value)">
    </div>
    <!-- <div class="sdisplay">
      <span class="attr-span">显示小数:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('yAxis.allowDecimals', true)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('yAxis.allowDecimals', $event, _this, 'bollean', false)">
      </el-switch>
    </div> -->
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
</template>

<script>
export default {
  data() {
    return {
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
      ]
    };
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
};
</script>