
<template>
  <attrCommon>
    <div class="oneblock">
      <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>地图参数</div>
      <div class="sdisplay" v-tip.dark.transition.bottom="'数值第一个字段'">
          <span class="attr-span">经度字段:</span>
          <input type="text" class="attr-input" :value="lng" disabled>
      </div>
      <div class="sdisplay" v-tip.dark.transition.bottom="'数值第二个字段'">
        <span class="attr-span">纬度字段:</span>
        <input type="text" class="attr-input" :value="lat" disabled>
      </div>
      <div class="sdisplay" v-tip.dark.transition.bottom="'数值第三个字段'">
        <span class="attr-span">提示标题:</span>
        <input type="text" class="attr-input" :value="val" disabled>
      </div>
      <div class="sdisplay">
        <span class="attr-span">提示内容:</span>
        <input type="text" class="attr-input" value="数值从第四个字段开始逐行显示" disabled>
      </div>
      <div class="sdisplay">
        <span class="attr-span">中心位置:</span>
        <input type="text" class="attr-input" :value="$bi.chart.getSetting('center', '')" @blur="$bi.chart.setSetting('center', $event.target.value, _this)">
      </div>
      <div class="sdisplay">
        <span class="attr-span">地图级别:</span>
        <select class="attr-select" :value="$bi.chart.getSetting('zoom', 5)" @change="$bi.chart.setSetting('zoom', $event.target.value, _this, 'number')">
          <option v-for="(option,index) in zooms" :value="option.value" :key="index">{{ option.name }}</option>
        </select>
      </div>
      <div class="sdisplay">
        <span class="attr-span">鼠标滚动:</span>
        <el-switch class="attr-input"
          :value="$bi.chart.getSetting('scrollWheel', false)"
          active-text="有效"
          inactive-text="无效" @change="$bi.chart.setSetting('scrollWheel', $event, _this)">
        </el-switch>
      </div>
      <div class="sdisplay">
        <span class="attr-span">跳转地址:</span>
        <input type="text" placeholder="为空时不跳转" class="attr-input" :value="$bi.chart.getSetting('url', '')" @blur="$bi.chart.setSetting('url', $event.target.value, _this)">
      </div>
      <div class="sdisplay">
        <span class="attr-span">开新窗口:</span>
        <el-switch class="attr-input"
          :value="$bi.chart.getSetting('target', false)"
          active-text="是"
          inactive-text="否" @change="$bi.chart.setSetting('target', $event, _this)">
        </el-switch>
      </div>
    </div>
  </attrCommon>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      zooms: defaultStyle.chartAmapZooms
    };
  },
  components: {
    attrCommon
  },
  computed: {
    _this() {
      return this;
    },
    lng() {
      if (bi.chart.data.query.fields1.length > 0) {
        return bi.chart.data.query.fields1[0].title;
      }
      return '';
    },
    lat() {
      if (bi.chart.data.query.fields1.length > 1) {
        return bi.chart.data.query.fields1[1].title;
      }
      return '';
    },
    val() {
      if (bi.chart.data.query.fields1.length > 2) {
        return bi.chart.data.query.fields1[2].title;
      }
      return '';
    }
  }
}
</script>