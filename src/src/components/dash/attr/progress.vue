<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>进度条设置
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">百分比:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.percentage">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">类型:</span>
          <select  class="dash-attr-select" v-model="itemData.data.type">
            <option value="line">line</option>
            <option value="circle">circle</option>
          </select>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">进度条宽度:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.strokeWidth">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">文字是否内部:</span>
         <el-switch v-model="itemData.data.textInside" active-text="是" inactive-text="否"></el-switch>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft inlineblock">颜色:</span>
          <el-color-picker v-model="itemData.data.color" size="mini" class="inlineblock"></el-color-picker>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">画布宽度:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.width">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">是否显示文字:</span>
          <el-switch v-model="itemData.data.showText" active-text="是" inactive-text="否"></el-switch>
        </div>
         <div class="dash-attr-row" >
          <span class="dash-attr-span" style="width:60px">垂直对齐:</span>
          <select class="dash-attr-select max" v-model="itemData.data.alignItems">
            <option v-for="(option,index) in alignItems" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
      </div>
    </div>
    <attrFont :css="itemData.data.css"></attrFont>
  </div>
</template>

<script>
import attrFont from "@/components/dash/attr/common/font";
import defaultStyle from "@/config/style.js";
export default {
  data() {
    return {
      alignItems: defaultStyle.alignItems
    };
  },
  components: {
    attrFont
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  }
};
</script>
<style lang="scss" scoped>
.dash-attr .dash-attr-block .dash-attr-row .dash-attr-span.sleft {
  width: 100px;
}
</style>


