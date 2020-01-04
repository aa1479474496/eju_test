<template>
  <div>
		<div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>地图参数</div>
      <div class="sdisplay">
        <div class="dash-attr-row">
            <span class="label">中心坐标:</span>
            <input class="dash-attr-input max" type="text" placeholder="116.405467, 39.907761"  v-model="itemData.data.mapCenter">
        </div>
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
            <span class="label">地图标题</span>
          <input class="dash-attr-input max" type="text" placeholder="为空时不显示标题" v-model="itemData.data.mapTitle"> 
        </div>
      </div>
		</div>
    <attrFont :css="itemData.data.css"></attrFont>
  </div>
</template>

<script>
import attrFont from '@/components/dash/attr/common/font';
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
    };
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  },
  components: {
    attrFont
  }
};
</script>