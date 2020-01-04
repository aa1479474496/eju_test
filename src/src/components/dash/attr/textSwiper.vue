<template>
<div>
	<div class="dash-attr-block">
		<div class="dash-attr-block-title" onclick="bi.toggle()">
      <span class="el-icon-arrow-down"></span>轮播文字
      <i class="el-icon-plus" @click.stop="addSwiperText"></i>
    </div>
		<div class="sdisplay" style="padding-left:15px;">
        <div class="dash-attr-row" v-for="(item,index) in fileList" :key="index">
           <input class="dash-attr-input max" type="text" placeholder="轮播文字" v-model="item.text" >
           <i class="el-icon-delete" @click="removeSwiperText(index)"></i>
        </div>
		</div>
	</div>

   <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>时间间隔
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
           <span class="dash-attr-span" style="width:100px">时间（ms）:</span>
			     <input class="dash-attr-input" style="text-align:left" type="text" v-model.lazy.trim="itemData.data.duration">
         </div>
      </div>
  </div>

  <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>显示个数
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span" style="width:100px">显示个数 :</span>
          <input class="dash-attr-input" style="text-align:left" type="text" v-model.lazy.trim="itemData.data.slidesPerView">
         </div>
      </div>
  </div>

  <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>滚动方向
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
            <el-radio-group v-model="itemData.data.direction" size="small">
              <el-radio label="horizontal" style="color:#fff" >水平</el-radio>
              <el-radio label="vertical" style="color:#fff" >垂直</el-radio>
          </el-radio-group>
         </div>
      </div>
  </div>
  <attrFont :css="itemData.data.css"></attrFont>

 </div>
</template>

<script>
import attrFont from "@/components/dash/attr/common/font";
export default {
  data() {
    return {
      uploadUrl: `${bi.env.apiUrl}/file/upload`
    };
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    },
    fileList() {
      return bi.dash.currItem.info.data.fileList || [];
    }
  },
  methods: {
    addSwiperText() {
      this.fileList.push({
        text: ""
      });
    },
    removeSwiperText(i) {
      this.itemData.data.fileList = this.itemData.data.fileList.filter((item, index, array) => {
        return i != index;
      });
    }
  },
  components: {
    attrFont
  }
};
</script>

<style lang="scss" scoped>
.mypictureCard {
  /deep/ .el-upload--picture-card {
    width: 65px;
    height: 65px;
    line-height: 65px;
  }
  /deep/ .el-upload-list__item {
    width: 65px;
    height: 65px;
    line-height: 65px;
  }
}
</style>
