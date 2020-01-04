<template>
  <div>

    <div class="dash-attr-block" v-if="iType == 2 && currItem.type != 'datavPage'">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>组件标题
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span6">组件标题</span>
          <input class="dash-attr-input px max"  type="text" v-model="currItem.info.sName" >
        </div>
      </div>
    </div>

    <div class="dash-attr-block" v-if="iType == 2 && currItem.type != 'datavPage'">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>图表尺寸位置
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span6">宽度</span>
          <input class="dash-attr-input px min" type="number" min="0"  v-model="currItem.info.w">
          <span class="dash-attr-span6">高度</span>
          <input class="dash-attr-input px min" type="number" min="0"  v-model="currItem.info.h">
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span6">横坐标</span>
          <input class="dash-attr-input px min" type="number" min="0"  v-model="currItem.info.x">
          <span class="dash-attr-span6">纵坐标</span>
          <input class="dash-attr-input px min" type="number" min="0"  v-model="currItem.info.y">
        </div>
      </div>
    </div>

		<div class="dash-attr-block">
			<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>样式设置</div>
			<div class="sdisplay">
				<div class="dash-attr-row">
          <span class="dash-attr-span">外边距:</span>
          <span class="dash-attr-span3">上</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('margin-top')" @input="setCss('margin-top', $event.target.value, 'px')"> 
          <span class="dash-attr-span3">下</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('margin-bottom')" @input="setCss('margin-bottom', $event.target.value, 'px')"> 
          <span class="dash-attr-span3">左</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('margin-left')" @input="setCss('margin-left', $event.target.value, 'px')">
          <span class="dash-attr-span3">右</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('margin-right')" @input="setCss('margin-right', $event.target.value, 'px')">
				</div>
				<div class="dash-attr-row">
          <span class="dash-attr-span">内边距:</span>
          <span class="dash-attr-span3">上</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('padding-top')" @input="setCss('padding-top', $event.target.value, 'px')">
          <span class="dash-attr-span3">下</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('padding-bottom')" @input="setCss('padding-bottom', $event.target.value, 'px')">
          <span class="dash-attr-span3">左</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('padding-left')" @input="setCss('padding-left', $event.target.value, 'px')">
          <span class="dash-attr-span3">右</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('padding-right')" @input="setCss('padding-right', $event.target.value, 'px')">
				</div>
				<div class="dash-attr-row">
          <span class="dash-attr-span">圆角:</span>
          <span class="dash-attr-span3">上</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('border-top-left-radius')" @input="setCss('border-top-left-radius', $event.target.value, 'px')">
          <span class="dash-attr-span3">下</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('border-top-right-radius')" @input="setCss('border-top-right-radius', $event.target.value, 'px')">
          <span class="dash-attr-span3">左</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('border-bottom-left-radius')" @input="setCss('border-bottom-left-radius', $event.target.value, 'px')">
          <span class="dash-attr-span3">右</span><input class="dash-attr-input px" type="number" min="0" :value="numberCss('border-bottom-right-radius')" @input="setCss('border-bottom-right-radius', $event.target.value, 'px')">
				</div>
				<div class="dash-attr-row">
          <span class="dash-attr-span">边框:</span>
          <el-color-picker class="dash-attr-colorpick" :value="stringCss('border-color')" show-alpha @change="setCss('border-color', $event)"></el-color-picker>
          <select class="dash-attr-select" :value="stringCss('border-style')" @change="setCss('border-style', $event.target.value)">
            <option v-for="(option,index) in borderStypeList" :key="index" :value="option.value" >{{ option.name }}</option>
          </select>
          <select class="dash-attr-select" :value="stringCss('border-width')" @change="setCss('border-width', $event.target.value)">
            <option  v-for="(option,index) in borderWidthList" :key="index" :value="option.value" >{{ option.name }}</option>
          </select>
			  </div>
				<div class="dash-attr-row">
          <span class="dash-attr-span">背景:</span>
          <el-color-picker class="dash-attr-colorpick" :value="stringCss('background')" show-alpha @change="setCss('background', $event)"></el-color-picker>
          <input class="dash-attr-input" style="width:205px" type="text" :value="stringCss('background')" readonly>
				</div>
				<!-- <div class="dash-attr-row">
          <span class="dash-attr-span">Class:</span>
          <input class="dash-attr-input max" type="text" :value="stringCss('class')" @input="setCss('class', $event.target.value)">
				</div> -->
        <div class="dash-attr-row">
          <span class="dash-attr-span">自定义:</span>
          <el-switch class="dash-attr-input"
            :value="boolCss('custom')"
            active-text="是"
            inactive-text="否" @change="setCss('custom', $event)">
          </el-switch>
        </div>
      </div>
      <div class="sdisplay" v-if="boolCss('custom')">
				<div class="dash-attr-row">
          <textarea class="dash-attr-textarea" rows="20" :value="cssText" @input="changeCss($event.target.value)"></textarea>
				</div>
      </div>
		</div>
  </div>
</template>

<script>
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      borderStypeList: defaultStyle.borderStype,
      borderWidthList: defaultStyle.borderWidth
    };
  },
  computed: {
    currItem() {
      return bi.dash.currItem;
    },
    cssText() {
      return JSON.stringify(this.currItem.info.css, '', 2);
    },
    iType(){
       return bi.dash.info.iType;
    }
  },
  methods: {
    numberCss(key) {
      return parseInt(this.currItem.info.css[key] || 0);
    },
    stringCss(key) {
      return this.currItem.info.css[key] || '';
    },
    boolCss(key) {
      return this.currItem.info.css[key] || false;
    },
    changeCss(_text) {
      let _json;
      try {
        _json = JSON.parse(_text);
      } catch (e) {
        return false;
      }
      
      // 已经移除的
      for (let key in this.currItem.info.css) {
        if (typeof _json[key] == 'undefined') {
          this.$set(this.currItem.info.css, key, undefined);
        }
      }

      // 新增和复盖的
      for (let key in _json) {
        this.$set(this.currItem.info.css, key, _json[key]);
      }
      //Object.assign(this.currItem.info.css, _json);
    },
    setCss(key, val, ffix = '') {
      // bi.log(key, val, ffix);
      if ([0, '', '0', 'none', null].indexOf(val) != -1) {
        val = undefined;
      }
      if (ffix) {
        val += ffix;
      }
      // bi.log(key, val, ffix);

      this.$set(this.currItem.info.css, key, val);
    }
  }
};
</script>