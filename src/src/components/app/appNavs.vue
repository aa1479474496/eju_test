<template>
  <div class="gnav clearfix">
    <div class="back">
        <i class="iconfont icon-back" @click="backAction"> </i>
    </div>
    <div class="setname">
      <input type="text" placeholder="请输入名称" v-model="app.data.sName">
    </div>
    <div class="gopt">
      <div class="items" @click="preview">
        <i class="iconfont icon-attention_light"></i>预览</div>
        <div class="items" @click="set('page')">
        <i class="iconfont icon-settings"></i>页面设置</div>
      <div class="items" @click="set('menu')">
        <i class="iconfont icon-settings"></i>菜单设置</div>
      <div class="items" @click="save">
        <i class="iconfont icon-shop"></i>保存</div>
    </div>
  </div>
</template>
<script>
import api from "@/server/api";
export default {
  data() {
    return {
      app: bi.app,
      optObj: bi.app.status
    };
  },
  methods: {
    preview() {
      let param = this.app.data;
      if (param.iAutoID != 0) {
        this.$router.push("/app/show/" + param.iAutoID);
      } else {
        this.$message({
          message: "请保存后再预览",
          type: "warning"
        });
      }
    },
    set(type) {
      if(type == 'page'){
        this.optObj.iSiteSet = true;
      }
      if(type == 'menu'){
        this.optObj.iSiteSet = false;
      }
      
    },
    save() {
      let param = this.app.data;
      param.sTheme = this.optObj.sTheme;
      api.appSave(param).then(res => {
        if (res.status) {
          this.$message({
            message: "信息存储成功",
            type: "success"
          });
          this.$router.push("/app/edit/" + res.data);
          this.app.data.iAutoID = res.data;
        }
      });
    },
    backAction() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.clearfix {
  zoom: 1;
}
.clearfix :after {
  clear: both;
  content: ".";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}

.gnav {
  background: #353f46;
  position: relative;
  color: #fff;
  height: 50px;
  border-bottom: 1px solid rgb(84, 92, 100);
  box-sizing: border-box;
  .back {
    float: left;
    width: 50px;
    height: 50px;
    display: block;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    background: #1b2126;
    .iconfont {
      font-size: 30px;
    }
  }
  .setname {
    float: left;
    padding: 9px;
    input {
      padding: 5px 10px;
      width: 285px;
      background-color: transparent;
      font-size: 16px;
      border: none;
      color: #fff;
      border: none;
      height: 32px;
      line-height: 32px;
      -webkit-appearance: none;
      outline: 0;
      box-sizing: border-box;
    }
    input:focus {
      box-shadow: 0 0 2px 0 #00aafb;
    }
  }

  .gopt {
    display: flex;
    float: right;
    line-height: 50px;
    height: 50px;
    margin-right: 10px;
    .items {
      padding: 0 20px;
      cursor: pointer;
      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        margin-top: -3px;
      }
    }
    .items:hover {
      background: #394b55;
    }
  }

}
</style>
