
<template>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>坐标轴</div>
    <div class="sdisplay">
      <span class="attr-span">图表缩放:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('toolbox.feature.dataZoom.show', false)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('toolbox.feature.dataZoom.show', $event, _this)">
      </el-switch>
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
      <select class="attr-select" :value="$bi.chart.getSetting('yAxis.type', 'value')" @change="$bi.chart.setSetting('yAxis.type', $event.target.value, _this)">
        <option v-for="(option,index) in ytypes" :value="option.value" :key="index">{{ option.name }}</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴排序:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('yAxis.inverse', false)"
        active-text="升序"
        inactive-text="降序" @change="$bi.chart.setSetting('yAxis.inverse', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴位置:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('yAxis.position', 'left') == 'left' ? true : false"
        active-text="左边"
        inactive-text="右边" @change="$bi.chart.setSetting('yAxis.position', $event ? 'left' : 'right', _this)">
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
      <input type="text" placeholder="为空则不显示Y轴标题" class="attr-input" :value="$bi.chart.getSetting('yAxis.name', '')" @blur="$bi.chart.setSetting('yAxis.name', $event.target.value, _this)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">Y轴单位:</span>
      <input type="text" placeholder="为空则不显示Y轴单位" class="attr-input" :value="$bi.chart.getSetting('yAxis.unit', '')" @blur="setUnit($event.target.value)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">X轴标题:</span>      
      <input type="text" placeholder="为空则不显示X轴标题" class="attr-input" :value="$bi.chart.getSetting('xAxis.name', '')" @blur="$bi.chart.setSetting('xAxis.name', $event.target.value, _this)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">X轴倾斜:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('xAxis.axisLabel.brotate', false)"
        active-text="否"
        inactive-text="是" @change="setxAxisRotate($event)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">X轴排序:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('xAxis.inverse', false)"
        active-text="升序"
        inactive-text="降序" @change="$bi.chart.setSetting('xAxis.inverse', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">X轴位置:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('xAxis.position', 'bottom') == 'bottom' ? true : false"
        active-text="下边"
        inactive-text="上边" @change="$bi.chart.setSetting('xAxis.position', $event ? 'bottom' : 'top', _this)">
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ytypes: [
        { name: "数值", value: "value" },
        { name: "对数", value: "log" },
        { name: "时间", value: "time" }
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
      bi.chart.setSetting('yAxis.axisLabel.formatter', _labelsFormat, this);
      bi.chart.setSetting('yAxis.unit', val, this);
    },
    setxAxisRotate(val) {
      let _axisLabel = bi.chart.getSetting('xAxis.axisLabel', {});
      if (val) {
        _axisLabel.interval = 0;
        _axisLabel.rotate = 40;
        _axisLabel.brotate = val;
      } else {
        _axisLabel.interval = undefined;
        _axisLabel.rotate = undefined;
        _axisLabel.brotate = undefined;
      }
      bi.chart.setSetting('xAxis.axisLabel', _axisLabel, this);
    }
  }
};
</script>