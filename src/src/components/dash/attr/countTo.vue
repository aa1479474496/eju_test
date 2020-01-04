<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>数字设置
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">开始数字:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.startVal">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">结束数字:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.endVal">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">持续时间:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.duration">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">是否自动播放:</span>
         <el-switch v-model="itemData.data.autoplay" active-text="是" inactive-text="否"></el-switch>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">小数位数:</span>
          <input class="dash-attr-input" type="number" v-model.lazy.trim="itemData.data.decimals">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">千位分隔符:</span>
          <input class="dash-attr-input" type="text" v-model.lazy.trim="itemData.data.separator">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">前缀单位:</span>
          <input class="dash-attr-input" type="text" v-model.lazy.trim="itemData.data.prefix">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">后缀单位:</span>
          <input class="dash-attr-input" type="text" v-model.lazy.trim="itemData.data.suffix">
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
import defaultStyle from "@/config/style.js";
import attrFont from "@/components/dash/attr/common/font";
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


