<template>
  <div class="datav-edit">
    <back-header head-title="编辑数据大屏幕" go-back='true'></back-header>
    <dashAdd class="dataV-addItems" @dashAddHandler="dashAddHandler"></dashAdd>
    <div class="edit-main"  >
      <div class="left-sort" :style="{width:screenData.sortListBase.width}">
        <div class="sl-opts" :class="screenData.sortListBase.icon" @click="sortListWidthHander()"></div>
        <sortList :selectItem="screenData.sortListBase.selectItem" :screenData="screenData"></sortList>
      </div>
      <div class="edit-screen">

        <div class="screen-canvas">
          <editArea :screenData="screenData"></editArea>
        </div>
        <div class="screen-zoom">
          <div class="fullscreen-btn" @click.stop="toFullScreen()">
            <i class="iconfont icon-full"></i>预览
          </div>
          <i class="z-iocn el-icon-remove-outline" @click="zoomHanlder('remove')"></i>
              <el-slider class="slider" :format-tooltip="formatTooltip" v-model="screenData.zoomsSale"></el-slider>
          <i class="z-iocn el-icon-circle-plus-outline" @click="zoomHanlder('plus')"></i>
        </div>

      </div>
      <div class="right-attr">
        <dashAttr></dashAttr>
      </div>
    </div>
  </div>
</template>
<script>
import "@/components/dash/init";
import backHeader from "@/components/common/backHeader";
import dashAdd    from "@/components/dash/com/dashAdd";
import sortList   from "@/components/datav/sortList";
import editArea   from "@/components/datav/editArea";
import dashAttr   from "@/components/dash/com/dashAttr";
export default {
  data() {
    return {
      screenData: {
        sortListBase: {
          width: "160px",
          icon: "el-icon-d-arrow-left",
          selectItem: "",
          activei: -1,
          newLayout:null
        },
        zoomsSale: 1,
        dataList: bi.dash.data
      }
    };
  },
  props: {
    mode: {
      type: String,
      default() {
        return "eidt";
      }
    }
  },
  components: {
    backHeader,
    dashAdd,
    sortList,
    editArea,
    dashAttr
  },
  created() {
    //请求数据
    let iAutoID = this.$route.params.id || "-1";
    bi.dash.loadData(iAutoID);
  },
  methods: {
    sortListWidthHander() {
      if (this.screenData.sortListBase.width == "160px") {
        this.screenData.sortListBase.width = 0;
        this.screenData.sortListBase.icon = "el-icon-d-arrow-right";
      } else {
        this.screenData.sortListBase.width = "160px";
        this.screenData.sortListBase.icon = "el-icon-d-arrow-left";
      }
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    formatTooltip(val) {
      return val / 100;
    },
    zoomHanlder(type) {
      if (type == "remove") {
        this.screenData.zoomsSale != 0 && this.screenData.zoomsSale--;
      } else {
        this.screenData.zoomsSale != 100 && this.screenData.zoomsSale++;
      }
    },
    toFullScreen() {
      let iAutoID = this.$route.params.id;
      if (iAutoID) {
        this.$router.push(`/datav/show/${iAutoID}`);
      }
    },
    dashAddHandler(layout){
      this.screenData.sortListBase.newLayout = layout;
    }
  }
};
</script>
<style lang="scss" scoped>
.datav-edit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.dataV-addItems {
  padding-top: 64px;
  position: relative;
  padding-left: 30px;
  height: 40px;
  line-height: 40px;
  box-shadow: inset 0 -1px 0 0 rgba(81, 130, 228, 0.2);
  color: rgba(255, 255, 255, 0.7);
  /deep/ i {
    margin-left: 15px;
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    color: rgba(255, 255, 255, 0.7);
  }
  /deep/ i:hover {
    color: rgba(255, 255, 255, 1);
  }
}

.edit-main {
  position: absolute;
  display: flex;
  top: 104px;
  left: 0;
  right: 0;
  bottom: 0; //   width: 160px;
  .left-sort {
    position: relative; // min-width: 160px;
    background: #f7f8fa;
    .sl-opts {
      position: absolute;
      left: 5px;
      width: 25px;
      height: 30px;
      z-index: 99999;
      top: 5px;
      padding: 2px 0px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 24px;
      color: rgba(0, 3, 51, 0.5);
      cursor: pointer;
      background: #eaf2f4;
      background-size: 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .edit-screen {
    position: relative;
    flex: 1;
    background: url("/static/fullscreenBg.png") repeat;
    background-size: 8px 8px;
    .screen-canvas {
      position: absolute;
      bottom: 37px;
      top: 0;
      left: 0;
      right: 0;
    }
    .screen-zoom {
      background: #fff;
      position: absolute;
      bottom: 0;
      height: 37px;
      width: 100%;
      border-right: 1px solid #dcdee3;
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      user-select: none;
      .fullscreen-btn {
        &:hover {
          color: #5182e4;
        }
        position: absolute;
        left: 0;
        top: 0;
        height: 37px;
        line-height: 37px;
        padding: 0 20px;
        cursor: pointer;
        .iconfont {
          margin-right: 8px;
        }
      }
      .slider {
        display: inline-block;
        width: 180px;
        margin: 0 15px;
      }
      .z-iocn {
        display: inline-block;
        font-size: 22px;
        vertical-align: middle;
        margin-top: -29px;
        cursor: pointer;
        &:hover {
          color: #5182e4;
        }
      }
    }
  }
  .right-attr {
    position: relative;
    background: #f7f8fa;
    width: 320px;
    box-sizing: border-box；;
  }
}
</style>
