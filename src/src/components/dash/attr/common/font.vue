<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>字体设置</div>
      <div class="sdisplay">
        <div class="dash-attr-row">        
          <span class="dash-attr-span2">样式:</span>
          <select class="dash-attr-select mid" :value="stringCss('theme')" @change="setCss('theme', $event.target.value)">
            <option v-for="(option,index) in textThemeList" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
          <span class="dash-attr-span2 dash-attr-marginl20">颜色:</span>
          <el-color-picker class="dash-attr-colorpick dash-attr-marginl20" :value="stringCss('color')"  @change="setCss('color', $event)" show-alpha></el-color-picker>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span2">字体:</span>
          <select class="dash-attr-select mid" :value="stringCss('font-family')" @change="setCss('font-family', $event.target.value)">
            <option v-for="(option,index) in fontFamilyList" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
          <span class="dash-attr-span2 dash-attr-marginl20">对齐:</span>
          <select class="dash-attr-select mid" :value="stringCss('text-align')" @change="setCss('text-align', $event.target.value)">
            <option v-for="(option,index) in textAlignList" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span2">大小:</span>
          <select class="dash-attr-select mid" :value="stringCss('font-size')" @change="setCss('font-size', $event.target.value)">
            <option v-for="(option,index) in fontSizeList" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
          <span class="dash-attr-span2 dash-attr-marginl20">加粗:</span>
          <select class="dash-attr-select mid" :value="stringCss('font-weight')" @change="setCss('font-weight', $event.target.value)">
            <option v-for="(option,index) in fontWeightList" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultStyle from '@/config/style.js';
export default {
  data() {
    return {
      fontSizeList: defaultStyle.fontSize,
      fontFamilyList: defaultStyle.fontFamily,
      textAlignList: defaultStyle.textAlign,
      textThemeList: defaultStyle.textTheme,
      fontWeightList: defaultStyle.fontWeight
    };
  },
  computed: {
    css() {
      return bi.dash.currItem.info.css;
    },
    fontSize() {
      return this.css['font-size'] || '';
    },
    fontFamily() {
      return this.css['font-family'] || '';
    },
    textAlign() {
      return this.css['text-align'] || '';
    },
    fontColor() {
      return this.css['color'] || '';
    },
    fontClass() {
      return this.css['theme'] || '';
    }
  },
  methods: {
    numberCss(key) {
      return parseInt(this.css[key] || 0);
    },
    stringCss(key) {
      return this.css[key] || '';
    },
    setCss(key, val) {
      val = val || undefined;
      this.$set(this.css, key, val);
    }
  }
};
</script>