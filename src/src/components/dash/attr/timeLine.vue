<template>
<div>
	<div class="dash-attr-block">
        <div class="dash-attr-block-title" onclick="bi.toggle()">
            <span class="el-icon-arrow-down"></span>时间轴数据
            <i class="el-icon-plus" @click.stop="addSwiperText"></i>
        </div>

        <div class="sdisplay" style="padding-left:15px;">
            <div class="dash-attr-row" v-for="(item,index) in fileList" :key="index">
                <div class="dash-attr-row">        
                    <input class="dash-attr-input" style="width:100px" type="text" placeholder="日期" v-model.lazy.trim="item.date">
                    <span class="dash-attr-span6 "  style="width:60px">边框颜色:</span>
                    <el-color-picker class="dash-attr-colorpick" style="vertical-align:middle;margin-top:-4px;"  v-model="item.color"></el-color-picker>
                    <i class="el-icon-delete" @click="removeSwiperText(index)"></i>
                </div>
                <div class="dash-attr-row">
                    <textarea class="dash-attr-textarea" placeholder="请输入内容"  v-model.lazy.trim="item.content"></textarea>
                </div>
            </div>
        </div>
	</div>

    <div class="dash-attr-block">
        <div class="dash-attr-block-title" onclick="bi.toggle()">
            <span class="el-icon-arrow-down"></span>属性设置
        </div>
        <div class="sdisplay" style="padding-left:15px;">
            <div class="dash-attr-row" >
                <span class="dash-attr-span6 " style="width:70px;">字体颜色:</span>
                <el-color-picker class="dash-attr-colorpick " v-model="itemData.data.options.fontcolor" ></el-color-picker>
            </div>

            <div class="dash-attr-row" >
                <span class="dash-attr-span6 "  style="width:70px;">大小设置:</span>
                <select class="dash-attr-select" v-model="itemData.data.options.zoom">
                    <option v-for="(item,index) in zoom" :value="item" :key="index">{{ item }}</option>
                </select>
            </div>
         </div>
	</div>

 </div>
</template>

<script>
import attrFont from "@/components/dash/attr/common/font";
export default {
  data() {
    return {
      zoom: [1, 2, 3, 4]
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
        date: "",
        color: "",
        content: ""
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
