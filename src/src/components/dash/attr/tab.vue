<template>
  <div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>标签管理
        <i class="el-icon-plus" style=""  @click.stop="addTab"></i>
      </div>
      <div class="sdisplay">
        <div v-for="(item,index) in itemData.data.tabs" :key="index" class="dash-attr-row">
          <span class="dash-attr-span">标签名：</span>
          <input class="dash-attr-input mid" type="text" placeholder="标签名" v-model="item.title">
          <i class="el-icon-delete opt-icon" @click="removeTab(index)"></i>
          <i class="el-icon-caret-top opt-icon" v-if="index>0" @click="moveUp(index)"></i>
          <i class="el-icon-caret-bottom opt-icon" v-if="index<itemData.data.tabs.length-1" @click="moveDown(index)"></i>
        </div>
      </div>
    </div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>样式管理
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span">位置：</span>
          <select class="dash-attr-select max" v-model="itemData.data.position">
            <option v-for="(item,index) in positions" :value="index" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span">主题：</span>
          <select class="dash-attr-select max" v-model="itemData.data.type">
            <option v-for="(item,index) in types" :value="index" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="dash-attr-row">
          <span class="dash-attr-span">颜色：</span>
          <select class="dash-attr-select max" v-model="itemData.data.class" >
            <option v-for="(item,index) in classes" :value="index"  :key="index">{{ item }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positions: {
        top: "顶部",
        left: "左侧",
        right: "右侧",
        bottom: "底部"
      },
      types: {
        "": "默认",
        card: "选项卡",
        "border-card": "卡片"
      },
      classes: {
        "": "默认",
        white: "白色",
        gray: "灰色",
        red: "红色",
        green: "绿色"
      }
    };
  },
  computed: {
    itemData() {
      return bi.dash.currItem.info;
    }
  },
  methods: {
    addTab() {
      let len = this.itemData.data.tabs.length + 1;
      this.itemData.data.tabs.push({ title: "Tab" + len, layout: [] });
    },
    moveUp(index) {
      let tmp = this.itemData.data.tabs;
      if (tmp.length > 0 && index > 0) {
        tmp.splice(index - 1, 2, tmp[index], tmp[index-1]);
      }
    },
    moveDown(index) {
      let tmp = this.itemData.data.tabs;
      if (tmp.length > 0 && index < tmp.length - 1) {
        tmp.splice(index, 2, tmp[index+1], tmp[index]);
      }
    },
    removeTab(index) {
      this.$confirm("是否删除该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.itemData.data.tabs.splice(index, 1);
        })
        .catch(() => {});
    }
  }
};
</script>