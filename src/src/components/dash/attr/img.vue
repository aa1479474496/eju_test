<template>
	<div class="dash-attr-block">
		<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>属性设置</div>
		<div class="sdisplay">

      <div class="dash-attr-row">
        <span class="dash-attr-span" style="width:65px;">图片来源:</span>
        <el-switch
          style="margin-top:-12px;"
          v-model="itemData.data.isUpload"
          active-text="上传"
          inactive-text="链接">
        </el-switch>
      </div>

			<div class="dash-attr-row" v-if="!itemData.data.isUpload">
				<span class="dash-attr-span">链接:</span>
				<input class="dash-attr-input max" type="text" :value="itemData.data.url" @blur="itemData.data.url=$event.target.value">
			</div>

       <div class="dash-attr-row" v-if="itemData.data.isUpload" style="margin:5px;">
        <el-upload class="upload-demo" :action="uploadUrl" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess" 
          :file-list="fileList" list-type="picture">
          <el-button size="small">点击上传</el-button>
        </el-upload>
      </div>

			<div class="dash-attr-row">
				<span class="dash-attr-span">跳转URL:</span>
				<input class="dash-attr-input max" type="text" :value="itemData.data.href" @blur="itemData.data.href=$event.target.value"> 
			</div>
      <div class="dash-attr-row">
        <span class="dash-attr-span">跳转:</span>
        <el-switch
          v-model="itemData.data.isNew"
          active-text="新窗口"
          inactive-text="本页面">
        </el-switch>
      </div>
		</div>
	</div>
</template>

<script>
import "@/config/env";
export default {
  data(){
    return {
      uploadUrl: `${bi.env.apiUrl}/file/upload`
    }
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    },
    fileList() {
      if (this.itemData.data.uploadImgUrl) {
        return [this.itemData.data.uploadImgUrl]
      }
      return [];
    }
  },
  methods:{
    handleRemove(file, fileList) {
      this.itemData.data.uploadImgUrl = '';
    },
    handleSuccess(res) {
      this.itemData.data.uploadImgUrl = {
        sName:res.file.sName,
        url:`${bi.env.apiUrl}/view/${res.file.sFile}`
      };
    }
  }
};
</script>