<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>内容
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <textarea class="dash-attr-textarea" rows="5" v-model="itemData.data.text"></textarea><br/>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span">速度:</span>
          <input class="dash-attr-input max" type="number" v-model="itemData.data.speed">
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
      alignItems: defaultStyle.alignItems,
      justifyContent: defaultStyle.justifyContent
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

