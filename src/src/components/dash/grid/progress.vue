<template>
  <el-progress
     class="progress"
     :style="{'justify-content':align,'align-items':itemData.data.alignItems || 'normal'}"
    :text-inside="textInside" 
    :show-text="showText"
    :stroke-width="strokeWidth"
    :type="type"
    :color="color"
    :width="swidth"
    :percentage="percentage">
  </el-progress>
</template>
<script>
export default {
  props: {
    itemData: Object
  },
  computed: {
    textInside() {
      return !!this.itemData.data.textInside;
    },
    showText() {
      return !!this.itemData.data.showText;
    },
    type() {
      return bi.dash.formatText(this.itemData.data.type) || "line";
    },
    color() {
      console.log(this.itemData.data.color);
      return this.itemData.data.color;
    },
    percentage() {
      let _val = Number(this.itemData.data.percentage);
      return !Number.isNaN(_val) ? _val : 0;
    },
    strokeWidth() {
      let _val = Number(this.itemData.data.strokeWidth);
      return !Number.isNaN(_val) ? _val : 6;
    },
    swidth() {
      let _val = Number(this.itemData.data.width);
      return !Number.isNaN(_val) ? _val : 126;
    },
    align() {
      let _css = this.itemData.css;
      if (_css["text-align"] == "justify") {
        return "space-between";
      } else {
        return _css["text-align"];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.progress {
  display: flex;
  height: 100%;
  padding: 0 10px;
}
</style>

