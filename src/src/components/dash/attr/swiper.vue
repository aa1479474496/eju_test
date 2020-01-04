<template>
<div>
	<div class="dash-attr-block">
		<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>轮播图片</div>
		<div class="sdisplay" style="padding-left:15px;">
        <el-upload
          class="mypictureCard"
          :action="uploadUrl"
          list-type="picture-card"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :before-remove ="handleRemoveBefore"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
   <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>时间间隔
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
           <span class="dash-attr-span" style="width:100px">时间（ms）:</span>
			     <input class="dash-attr-input" style="text-align:left" type="text" :value="itemData.data.duration" @blur="itemData.data.duration=$event.target.value">
         </div>
      </div>
  </div>

  <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>切换方式
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span" style="width:100px">切换方式 :</span>
           <select class="dash-attr-select " v-model="itemData.data.effect">
            <option v-for="(option,index) in effectArr" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
         </div>
      </div>
  </div>


   <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>控制器
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span" style="width:100px">控制器 :</span>
           <select class="dash-attr-select " v-model="itemData.data.controlBar">
            <option v-for="(option,index) in controlBarArr" :value="option.value" :key="index">{{ option.name }}</option>
          </select>
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
          <input class="dash-attr-input" style="text-align:left" type="text" :value="itemData.data.slidesPerView" @blur="itemData.data.slidesPerView=$event.target.value">
         </div>
      </div>
  </div>

 </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: `${bi.env.apiUrl}/file/upload`,
      effectArr: [
        { name: "滑动", value: "slide" },
        { name: "淡入", value: "fade" },
        { name: "方块", value: "cube" },
        { name: "3d流", value: "coverflow" },
        { name: "3d翻转", value: "flip" }
      ],
      controlBarArr: [
        { name: "无", value: "none" },
        { name: "分页器", value: "pagination" },
        { name: "前后按钮", value: "navigation" },
        { name: "滚动条", value: "scrollbar" }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    },
    fileList() {
      return bi.dash.currItem.info.data.fileList;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.itemData.data.fileList = fileList;
    },
    handleRemoveBefore(file, fileList) {
      if (fileList.length == 1) {
        this.$message({
          message: "请确保轮播至少有一张图片！",
          type: "warning"
        });
        return false;
      }
    },
    handleSuccess(res) {
      this.fileList.push({
        sName: res.file.sName,
        url: `${bi.env.apiUrl}/view/${res.file.sFile}`
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlerError() {
      console.error("upload error");
    }
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
