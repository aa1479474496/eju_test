<template>
  <div class="menu-attr-set" :style="{display: editMeunData.showAt ? ' block' : 'none'}">
    <div class="set-head">
      内容设置
      <i class="el-icon-close" @click="hideAttr"></i>
    </div>

    <div class="set-items">
      <div class="set-items-label">
        菜单名称
      </div>
      <div class="forlabel">
        <input type="text" class="defaultInput" v-model="editMeunData.attr.name">
      </div>
    </div>

    <div class="set-items">
      <div class="set-items-label">
        菜单icon
        <el-switch v-model="editMeunData.attr.useIcon"> </el-switch>
      </div>
      <div class="forlabel">
        <div class="select-icons">
          <div class="select-icons-result">
            <i class="iconfont" :class="iconName"></i>
          </div>
          <div class="select-icon-lists">
            <i v-for="(item ,index) in iconArr" :key="index" class="iconfont" :class="item" @click="setIcon(item)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="set-items" v-if=" !(editMeunData.attr.children && editMeunData.attr.children.length != 0)">
      <div class="set-items-label">
        内容配置
      </div>
      <div class="forlabel">
        <el-radio v-model="editMeunData.attr.linkType" label="dash">仪表板</el-radio>
        <div class="radio-next">
          <input type="text" class="defaultInput" v-model="editMeunData.attr.dashAddr" @input="setlinkType('dash')">
        </div>
        <el-radio v-model="editMeunData.attr.linkType" label="link">外部链接</el-radio>
        <div class="radio-next">
          <input type="text" class="defaultInput" v-model="editMeunData.attr.linkAddr"  @input="setlinkType('link')">
        </div>
      </div>
    </div>

    <div class="set-items" v-if=" !(editMeunData.attr.children && editMeunData.attr.children.length != 0)">
      <div class="set-items-label">
        查看方式
      </div>
      <div class="forlabel">
        <div>
          <el-radio v-model="editMeunData.attr.lookType" label="current">当前页打开</el-radio>
        </div>

        <div>
          <el-radio v-model="editMeunData.attr.lookType" label="blank">新窗口打开</el-radio>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultIcon: "icon-home",
      editMeunData: bi.app.status,
      iconArr: bi.app.menuIcon
    };
  },
  methods: {
    hideAttr() {
      this.editMeunData.showAt = false;
    },
    setIcon(icon) {
      this.editMeunData.attr.useIcon && (this.defaultIcon = icon);
    },
    setlinkType(type){
      this.editMeunData.attr.linkType = type;
    }
  },
  computed: {
    iconName() {
      return !this.editMeunData.attr.icon
        ? "icon-home"
        : this.editMeunData.attr.icon;
    }
  },
  watch: {
    defaultIcon(val) {
      this.$set(this.editMeunData.attr, "icon", this.defaultIcon);
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-attr-set {
  width: 200px;
  background: #fff;
  .set-head {
    padding: 30px 20px;
    height: 80px;
    box-sizing: border-box;
    font-size: 20px;
    line-height: 1;
    background: hsla(0, 0%, 100%, 0.4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    i {
      float: right;
      cursor: pointer;
    }
  }

  .set-items {
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .set-items-label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 1;
      margin-bottom: 10px;
    }
    .forlabel {
      .defaultInput {
        position: relative;
        display: inline-block;
        padding: 4px 7px;
        width: 100%;
        height: 28px;
        cursor: text;
        font-size: 14px;
        box-sizing: border-box;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        transition: all 0.3s;
      }
      .select-icons-result {
        height: 28px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        color: #5182e4;
        i {
          font-size: 20px;
        }
      }
      .select-icon-lists {
        cursor: pointer;
        font-size: 24px;
        padding-top: 10px;
        .iconfont {
          font-size: 20px;
          margin: 5px;
          display: inline-block;
        }
      }

      .radio-next {
        margin: 10px 0;
      }
    }
  }
}
</style>
