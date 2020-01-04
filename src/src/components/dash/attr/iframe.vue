<template>
	<div>
		<div class="dash-attr-block">
			<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>属性设置</div>
			<div class="sdisplay">
				<div class="dash-attr-row">
          <span class="dash-attr-span">地址:</span>
					<input class="dash-attr-input max" type="text" :value="itemData.data.url" @blur="itemData.data.url=$event.target.value">
				</div>
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