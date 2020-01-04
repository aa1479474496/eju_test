
<template>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图表标题</div>
    <div class="sdisplay">
      <span class="attr-span">图表标题:</span>
      <input type="text" class="attr-input" :value="$bi.chart.getSetting('title.text', '')" @blur="$bi.chart.setSetting('title.text', $event.target.value, _this)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">图表副标题:</span>
      <input type="text" class="attr-input" :value="$bi.chart.getSetting('title.subtext', '')" @input="$bi.chart.setSetting('title.subtext', $event.target.value, _this)">
    </div>
    <div class="sdisplay">
      <span class="attr-span">是否显示:</span>
      <el-switch class="attr-input"
        :value="$bi.chart.getSetting('title.show', true)"
        active-text="是"
        inactive-text="否" @change="$bi.chart.setSetting('title.show', $event, _this)">
      </el-switch>
    </div>
    <div class="sdisplay">
      <span class="attr-span">水平位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('title.align', 'left')" @change="setSetting('title.align', $event.target.value)">
        <option value="left">左</option>
        <option value="center">中</option>
        <option value="right">右</option>
      </select>
    </div>
    <div class="sdisplay">
      <span class="attr-span">垂直位置:</span> 
      <select class="attr-select" :value="$bi.chart.getSetting('title.verticalAlign', 'top')" @change="setSetting('title.verticalAlign', $event.target.value, _this)">
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
      if (key == 'title.align') {
        let _title = bi.chart.getSetting('title', {});
        if (val == 'left') {
          _title.left = '40';
          _title.right = undefined;
        } else if (val == 'right') {
          _title.right = '40';
          _title.left = undefined;
        } else {
          _title.left = 'center';
          _title.right = undefined;
        }
        _title.align = val;
        bi.chart.setSetting('title', _title, this);
      } else if (key == 'title.verticalAlign') {
        let _title = bi.chart.getSetting('title', {});
        if (val == 'top') {
          _title.top = '40';
          _title.bottom = undefined;
        } else if (val == 'bottom') {
          _title.bottom = '40';
          _title.top = undefined;
        } else {
          _title.top = 'middle';
          _title.right = undefined;
        }
        _title.verticalAlign = val;
        bi.chart.setSetting('title', _title, this);
      }
    }
  }
};
</script>