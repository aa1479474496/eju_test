<template>
	<div class="dash-attr-block">
		<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>属性设置</div>
		<div class="sdisplay">
            <div class="dash-attr-row" >
                <span class="dash-attr-span"  style="width:58px;">分值:</span>
                <input class="dash-attr-input max" type="text" v-model.number.lazy.trim="itemData.data.score">
            </div>

            <div class="dash-attr-row" >
                <span class="dash-attr-span"  style="width:58px;">最大分值:</span>
                <input class="dash-attr-input max" type="text" v-model.number.lazy.trim="itemData.data.max">
            </div>

            <div class="dash-attr-row" style="padding:10px 10px;">
                <span class="dash-attr-span " style="width:58px;" >默认颜色:</span>
                <el-color-picker v-model="itemData.data.unselectcolor" size="mini" class="inlineblock"></el-color-picker>
                  <span class="dash-attr-span" style="width:58px;" >选中颜色:</span>
                <el-color-picker v-model="itemData.data.selectcolor" size="mini" class="inlineblock"></el-color-picker>
                  <span class="dash-attr-span" style="width:58px;" >字体颜色:</span>
                <el-color-picker v-model="itemData.data.fontcolor" size="mini" class="inlineblock"></el-color-picker>
            </div>
		</div>
	</div>
</template>

<script>
export default {
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  }
};
</script>