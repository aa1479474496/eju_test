
<template>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图例设置</div>
    <div class="sdisplay">
      <span class="attr-span">是否显示:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('legend.show', true)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('legend.show', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">布局方式:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('legend.orient', 'horizontal')" @change="$bi.chart.setSetting('legend.orient', $event.target.value, _this)">
        <option value="horizontal">水平布局</option>
        <option value="vertical">垂直布局</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('legend.halign', 'center')" @change="setSetting('legend.halign', $event.target.value)">
        <option value="left">左</option>
        <option value="center">中</option>
        <option value="right">右</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">垂直位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('legend.valign', 'bottom')" @change="setSetting('legend.valign', $event.target.value, _this)">
        <option value="top">上</option>
        <option value="middle">中</option>
        <option value="bottom">下</option>
      </select>
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
  },
  methods: {
    setSetting(key, val) {
      if (key == 'legend.halign') {
        let _legend = bi.chart.getSetting('legend', {});
        if (val == 'left') {
          _legend.left = '40';
          _legend.right = undefined;
        } else if (val == 'right') {
          _legend.right = '40';
          _legend.left = undefined;
        } else {
          _legend.left = 'center';
          _legend.right = undefined;
        }
        _legend.halign = val;
        bi.chart.setSetting('legend', _legend, this);
      } else if (key == 'legend.valign') {
        let _legend = bi.chart.getSetting('legend', {});
        if (val == 'top') {
          _legend.top = '40';
          _legend.bottom = undefined;
        } else if (val == 'bottom') {
          _legend.bottom = '40';
          _legend.top = undefined;
        } else {
          _legend.top = 'middle';
          _legend.right = undefined;
        }
        _legend.valign = val;
        bi.chart.setSetting('legend', _legend, this);
      }
    }
  }
}
</script>