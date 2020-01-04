<template>
  <div class="protal-page">
    <!-- header -->
    <div class="protal-header" :style="headerStyle">
      <div v-show="data.sLogo != '' "  class="protal-header-log">
        <img :src="uploadUrl">
      </div>
      <div class="protal-header-name">{{data.sTitle}}</div>

      <div class="userSet" style="position:absolute;right:10px;">
        <div class="users">
          <i class="bdp-icon ico-default-photo-32"></i>
          <span class="uText">{{$bi.user.info.sRealName}}</span>
          <i class="iconfont icon-logout" @click.self="$bi.user.logout()"></i>
        </div>
      </div>
    </div>
    <!-- end header -->
    <div class="protal-main" :style="{bottom:setBottom}">
      <div class="protal-main-menu" :style="{'background':getBackground}">
        <appMenu :isShow="isShow" :theme="themeObj" :collapse="collapse"></appMenu>
        <div v-show="isShow" class="collapse-opt" @click="collapseChange()">
          <div class="collapse-inners"></div>
        </div>
      </div>
      <div class="protal-main-content" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" :style="{'background':bodyColor}">
        <template v-if="!eidtStatus && !(icontent.children && icontent.children.length > 0 )">
          <dashShow  v-if=" icontent.linkType == 'dash' && icontent.lookType != 'blank' && icontent.dashAddr "></dashShow>
          <iframe v-if=" icontent.linkType == 'link'  &&  icontent.lookType != 'blank'  &&  !(icontent.children && icontent.children.length > 0 )" :src="icontent.linkAddr"></iframe>
        </template>
      </div> 
    </div>

    <div class="protal-footer" v-if="data.sFooter.trim() != '' ">
      {{data.sFooter}}
    </div>
  </div>  
</template>
<script>
import appMenu from "@/components/app/menu";
import dashShow from "@/page/bi/dash/show";
export default {
  data() {
    return {
      collapse:false
    };
  },
  components: {
    appMenu,
    dashShow
  },
  props: {
    isShow: Boolean,
    app: Object,
    loading: Boolean
  },
  watch: {
    loading() {
      this.navChange(bi.app.status.attr);
    }
  },
  computed: {
    eidtStatus() {
      return this.app.status.isEdit;
    },
    getBackground() {
      return this.app.theme[this.app.status.sTheme].backgroundColor;
    },
    bodyColor() {
      return this.app.theme[this.app.status.sTheme].bodyColor;
    },
    headerStyle() {
      return {
        backgroundColor: this.app.theme[this.app.status.sTheme]
          .headerBackground,
        color: this.app.theme[this.app.status.sTheme].headerColor
      };
    },
    themeObj() {
      if (!this.app.status.sTheme || this.app.status.sTheme == 0) {
        return this.app.theme["dark"];
      }
      return this.app.theme[this.app.status.sTheme];
    },
    uploadUrl() {
      return `${bi.env.apiUrl}/view/${this.data.sLogo}`;
    },
    icontent() {
      return this.app.status.attr;
    },
    data() {
      return this.app.data;
    },
    setBottom() {
      let bottom = 0;
      if (this.app.data.sFooter.trim() != "") {
        bottom = "41px";
      }
      return bottom;
    }
  },
  methods: {
    navChange(val) {
      let __iurl = "show";
      if (!this.isShow) {
        __iurl = "edit";
      }
      if (val.children && val.children.length > 0) {
        return false;
      }
      if (val.lookType == "blank") {
        if (val.linkType == "dash") {
          val.dashAddr &&
            window.open(`${window.location.origin}/dash/show/${val.dashAddr}`);
        } else {
          val.linkAddr && window.open(val.linkAddr);
        }
      } else {
        if (val.linkType != "dash") {
          this.$router.replace(`/app/${__iurl}/${this.$route.params.appid}`);
        } else {
          val.dashAddr &&
            this.$router.replace(
              `/app/${__iurl}/${this.$route.params.appid}/dash/${val.dashAddr}`
            );
        }
      }
    },
    collapseChange(){
      this.collapse = !this.collapse;
    }
  }
};
</script>
<style lang="scss" scoped>
.protal-page {
  flex: 1;
  position: relative;
  .protal-header {
    height: 62px;
    padding: 0 10px;
    display: flex;
    .protal-header-log {
      width: 36px;
      height: 36px;
      margin-top: 15px;
      margin-right: 20px;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      img {
        width: 36px;
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        line-height: 36px;
      }
    }
    .protal-header-name {
      line-height: 66px;
    }
  }
  .protal-main {
    position: absolute;
    left: 0;
    right: 0;
    top: 62px;
    bottom: 0;
    display: flex;
    .protal-main-menu {
      // width: 300px;
      position: relative;
      background: rgb(84, 92, 100);
    }
    .protal-main-content {
      flex: 1;
      overflow: scroll;
      position: relative;
      iframe {
        height: 100%;
        width: 100%;
      }
    }
  }
  .protal-footer {
    background: #e6e6e6;
    height: 44px;
    line-height: 44px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

.collapse-opt {
  width: 15px;
  height: 84px;
  background: rgba(78, 84, 108, 1);
  border-radius: 0 4px 4px 0;
  position: absolute;
  right: -15px;
  z-index: 999;
  top: 40%;
  cursor: pointer;
  .collapse-inners {
    width: 4px;
    height: 40px;
    margin-top: 22px;
    margin-left: 5px;
    background: rgba(35, 153, 241, 1);
    border-radius: 2px;
  }
}
</style>
