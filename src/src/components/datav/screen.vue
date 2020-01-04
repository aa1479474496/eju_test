<template>
  <div class="trans-mian " 
    :class="'dash-theme-' + theme"  
    v-loading="!dash.status"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 1)" 
    :style="{width:`${dashData.datav.w}px`,height:`${dashData.datav.h}px`,'transform-origin':transformOrigin,transform:transform }" >
    <div id="capture" class="realpages" style="background:#191A2C" :style="dashData.css">
        <DragResize 
          v-for="(item,index) in screenData.dataList.layout" 
          :key="item.i"
          :minw="item.minw" 
          :minh="item.minh" 
          :w="Number(item.w)" 
          :h="Number(item.h)"  
          :z="screenData.dataList.layout.length-index"
          :x="Number(item.x)"
          :y="Number(item.y)"
          :potMod="coms[item.type]" 
          :active="getActive(item.i) "
          :parent="false" 
          :maximize="false"
          :scale="screenData.zoomsSale/100"
          :grid="[1,1]"
          :draggable="showType !='show' ? draggable :false"
          :resizable="showType !='show'? true :false"
          @resizestop="resizestop" 
          @dragstop="dragstop"
          @click.native.stop="onActivated(item)"
          @mouseout.native="outAcitve(item)"
          @optHandler="optHandler(arguments, index)"
          style="background:rgb(29, 37, 50)"
          :class="itemClass(item)"
          :style="item.css">
            <dashItem
              :itemData="item"
              :layout="dash.data.layout"
              :mode="mode"
              :bPoint="false">
            </dashItem>
        </DragResize>
        </div>
    </div>
</template>
<script>
import DragResize from "./dragResize";
import '@/style/default/dashLayout';
import dashItem from "@/components/dash/com/gridItem";
import api from "@/server/api";
export default {
  data: function() {
    return {
      transform: "transform: scale(1)",
      transformOrigin: `0 0 0`,
      draggable: false,
      dash: bi.dash,
      coms: bi.dash.components
    };
  },
  props: {
    screenData: Object,
    mode: {
      type: String,
      default() {
        return "edit";
      }
    },
    showType: {
      type: String,
      default() {
        return "show";
      }
    }
  },
  computed: {
    currItem() {
      return bi.dash.currItem;
    },
    dashData() {
      return bi.dash.data;
    },
    theme(){
      //  return bi.dash.getTheme();
      return 'default'
    }
  },
  methods: {
    itemClass(item) {
      let _itemName = "dash-" + item.type;
      let _class = "dash-item " + _itemName;
      if (item.css && item.css.theme) {
        _class += " " + _itemName + "-" + item.css.theme;
      }
      if (item.css && item.css.class) {
        _class += " " + _itemName + "-" + item.css.class;
      }

      return _class;
    },
    getActive(i) {
      if (this.showType == "show") {
        return false;
      }
      return this.screenData.sortListBase.activei == i;
    },
    outAcitve() {
      if (this.showType == "show") {
        return false;
      }
      this.draggable = false;
    },
    resizestop(x, y, w, h) {
      let _i = this.screenData.sortListBase.activei;
      if (_i != -1) {
        this.screenData.dataList.layout.forEach(e => {
          if (e.i == _i) {
            Object.assign(e, {
              x,
              y,
              w,
              h
            });
          }
        });
      }
      window.dispatchEvent(new Event("resize"));
    },
    dragstop(x, y) {
      let _i = this.screenData.sortListBase.activei;
      if (_i != -1) {
        this.screenData.dataList.layout.forEach(e => {
          if (e.i == _i) {
            Object.assign(e, {
              x,
              y
            });
          }
        });
      }
    },
    onActivated(item) {
      if (this.showType != "edit") {
        return false;
      }
      let type = item.type;
      let index = item.i;
      this.draggable = true;
      this.screenData.sortListBase.activei = item.i;
      let _item = {
        type: type,
        info: this.screenData.dataList.layout.filter(el => el.i == index)[0]
      };
      this.$set(bi.dash, "currItem", _item);
    },
    saveData() {
      bi.log("save dash datav: " + this.dash.info.iAutoID);
      api.dashSave({
          id: this.dash.info.iAutoID,
          data: this.dash.data,
          type: this.dash.info.iType,
          name: this.dash.info.sName,
          node: this.dash.info.iNodeID
        })
        .then(res => {
          if (!res.status) {
            bi.error("数据存储失败！");
          }
        });
    },
    optHandler(type, index) {
      let _type = type[0];
      if (_type == "copy") {
        this.copyItem(index);
      } else if (_type == "delete") {
        this.delItem(index);
      } else if (_type == "eidt") {
        this.goItem(index);
      }
    },
    delItem(index) {
      this.screenData.dataList.layout.splice(index, 1);
    },
    copyItem(index) {
      let _item = this.screenData.dataList.layout[index];
      let conf = bi.dash.components[_item.type];
      let _index = 0;
      if (this.screenData.dataList.layout.length > 0) {
        let _arr = this.screenData.dataList.layout.map(el => el.i);
        _index = Math.max.apply(null, _arr) + 1;
      }
      // 深拷贝
      let newItem = JSON.parse(JSON.stringify(_item));
      newItem.i = _index;
      newItem.sName = `${conf.dataV.sTitle}-${_index}`;
      // 判断是否要特殊处理
      if (typeof conf["opt"].copy == "function") {
        conf["opt"].copy(newItem, this.screenData.dataList.layout);
      } else {
        this.screenData.dataList.layout.push(newItem);
      }
    },
    goItem(index) {
      let _item = this.screenData.dataList.layout[index];
      let conf = bi.dash.components[_item.type];
      conf["opt"].edit(_item, this.$router);
    }
  },
  watch: {
    "screenData.zoomsSale"(val) {
      this.transform = `scale(${val / 100})`;
    },
    "dash.data": {
      deep: true,
      handler: function(val, old) {
        if (!bi.dash.status) {
          return false;
        }
        let _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
          _this.saveData();
          window.dispatchEvent(new Event("resize"));
        }, 300);
      }
    },
    "dash.data.datav.h"() {
      window.dispatchEvent(new Event("resize"));
    },
    "dash.data.datav.w"() {
      window.dispatchEvent(new Event("resize"));
    }
  },
  components: {
    DragResize,
    dashItem
  }
};
</script>
<style lang="scss" scoped>
.trans-mian {
  position: absolute;
  .realpages {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
</style>


