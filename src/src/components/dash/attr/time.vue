<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>图标样式
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">图标大小:</span>
          <el-slider v-model="itemData.data.iconSize"></el-slider>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft inlineblock">图标颜色:</span>
          <el-color-picker v-model="itemData.data.iconColor" size="mini" class="inlineblock"></el-color-picker>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span sleft">时间格式:</span>
           <input class="dash-attr-input" type="text" v-model.lazy.trim="itemData.data.format">
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
import defaultStyle from '@/config/style.js';
import attrFont from '@/components/dash/attr/common/font';
export default {
  data(){
    return {
        alignItems:defaultStyle.alignItems
    }
  },
  components: {
    attrFont
  },
  mounted(){
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  }
};
</script>
<style lang="scss" scoped>
.dash-attr .dash-attr-block .dash-attr-row .dash-attr-span.sleft{
  width:100px;
}
</style>


