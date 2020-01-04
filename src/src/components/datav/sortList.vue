<template>
  <div class="screen-data">
    <!--header-->
    <div class="sl-header">
      图层
    </div>
    <!--nav opt -->
    <div class="sl-opt" :class="{iused:(iselectVal != '')}">
      <div class="optItem" @click="sortHandler('top')">
        <el-tooltip class="item" effect="dark" content="置顶" placement="bottom" :hide-after="hideAfter">
          <i class="iconfont icon-top"></i>
        </el-tooltip>
      </div>
      <div class="optItem" @click="sortHandler('up')">
        <el-tooltip class="item" effect="dark" content="向上一层" placement="bottom" :hide-after="hideAfter">
          <i class="iconfont icon-ascending"></i>
        </el-tooltip>
      </div>
      <div class="optItem" @click="sortHandler('down')">
        <el-tooltip class="item" effect="dark" content="向下一层" placement="top" :hide-after="hideAfter">
          <i class="iconfont icon-descending"></i>
        </el-tooltip>
      </div>
      <div class="optItem" @click="sortHandler('bottom')">
        <el-tooltip class="item" effect="dark" content="置底" placement="top" :hide-after="hideAfter">
          <i class="iconfont icon-down"></i>
        </el-tooltip>
      </div>
    </div>
    <!--list-->
    <div class="sl-list">
      <el-radio-group v-model="iselectVal" class="sl-list-group">
        <draggable v-model="screenData.dataList.layout" @end="dragEnd()" :options="{draggable:'.sl-item-li'}">
          <div class="sl-item-li" v-for="(item,index) in screenData.dataList.layout" :key="index" @change="setselect(item)">
            <el-radio :label="item.sName"></el-radio>
          </div>
        </draggable>
      </el-radio-group>
    </div>
    <!--bottom-->
    <div class="sl-bottom" :class="{candel:(iselectVal != '')}"  @click="delHandler()">
        <i class="iconfont icon-delete"></i>删除
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      hideAfter: 1000,
      iselectVal: ""
    };
  },
  props: {
    screenData: Object
  },
  computed: {
    activei() {
      return this.screenData.sortListBase.activei;
    },
    activeLayout() {
      return this.screenData.sortListBase.newLayout;
    }
  },
  methods: {
    sortHandler(val) {
      let _index = this.getIndex();
      if (_index == -1) {
        return false;
      }
      let _copyIndex = _index;
      if (val == "up") {
        _index != 0 && _index--;
      }
      if (val == "down") {
        _index != this.screenData.dataList.layout.length - 1 && _index++;
      }
      if (val == "top") {
        _index = 0;
      }
      if (val == "bottom") {
        _index = this.screenData.dataList.layout.length - 1;
      }
      let _item = this.getItemData();
      this.screenData.dataList.layout.splice(_copyIndex, 1);
      this.screenData.dataList.layout.splice(_index, 0, _item);
      window.dispatchEvent(new Event("resize"));
    },
    setselect(item) {
      this.screenData.sortListBase.activei = item.i;
      let _item = {
        type: item.type,
        info: this.screenData.dataList.layout.filter(el => el.i == item.i)[0]
      };
      this.$set(bi.dash, "currItem", _item);
    },
    dragEnd(val) {
      if (this.iselectVal == "") {
        return false;
      }
      window.dispatchEvent(new Event("resize"));
    },
    delHandler() {
      if (this.iselectVal == "") {
        return false;
      }
      let _index = this.getIndex();
      _index != -1 && this.screenData.dataList.layout.splice(_index, 1);
      this.iselectVal = "";
      this.screenData.sortListBase.activei = -1;
    },
    getIndex() {
      let _index = -1;
      this.screenData.dataList.layout.forEach((ele, index) => {
        if (ele.i == this.activei) {
          _index = index;
          return false;
        }
      });
      return _index;
    },
    getItemData() {
      return this.screenData.dataList.layout.filter(ele => {
        return ele.i == this.activei;
      })[0];
    }
  },
  components: {
    draggable
  },
  watch: {
    activei(val) {
      this.iselectVal = this.screenData.dataList.layout.filter(ele => {
        return ele.i == val;
      })[0].sName;
    },
    activeLayout(val) {
      if (!val) {
        return false;
      }
      this.iselectVal = val.sName;
      this.setselect(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.screen-data {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .sl-header {
    position: relative;
    background: #fff;
    height: 40px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    color: #666;
    border-bottom: 1px solid #dcdee3;
  }
  .sl-opt {
    height: 34px;
    line-height: 34px;
    display: flex;
    border-bottom: 1px solid #dcdee3;
    .optItem {
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 18px;
      }
    }
  }

  .iused .optItem:hover {
    color: #fff;
    background: #409eff;
    cursor: pointer;
  }

  .sl-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 37px;
    top: 75px;
    overflow-y: scroll;

    .sl-list-group {
      display: block;
    }
    .sl-item-li {
      display: block;
      width: 100%;
      height: 26px;
      border: 1px solid transparent;
      padding: 5px 5px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #dcdee3;
      cursor: move;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .sl-bottom {
    position: absolute;
    height: 37px;
    line-height: 37px;
    bottom: 0;
    z-index: 99;
    border-top: 1px solid #ddd;
    width: 100%;
    padding-left: 15px;
    font-size: 14px;
    color: #666;
    box-sizing: border-box;
    user-select: none;
    .iconfont {
      font-size: 14px;
      margin-right: 5px;
    }
  }
  .sl-bottom.candel:hover {
    color: #5182e4;
    cursor: pointer;
  }
}
</style>
