<template>
<div :class="'dash-mode-'+mode" v-if=" layout.length > 0">
  <grid-layout
    :layout="layoutList"
    :col-num="colNum"
    :row-height="rowHeight"
    :is-resizable="canMove"
    :vertical-compact="gridCompact"
    :use-css-transforms="true"
    :margin="gridMargin"
  >
    <grid-item
      v-for="item in layoutList"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      @resized="resizedEvent(item.type)"
      @moved="movedEvent"
      @click.native.stop="itemClick(item.i,item.type)"
      @mouseleave.native="hidePoint(item.i)"
      @mouseenter.native="showPoint(item.i)"
      :key="item.i"
      :style="item.css"
      :class="itemClass(item)"
      :is-draggable="canMove"
      :minH="getMinHeight(item.type)"
    >
      <dashItem
        :itemData="item"
        :layout="layout"
        :mode="mode"
        :bPoint="!!bPoint[item.i]"
      >
      </dashItem>
    </grid-item>
  </grid-layout>
</div>
</template>

<script>
import api from "@/server/api";
import dashItem from "./gridItem";
import { GridItem, GridLayout } from "vue-grid-layout";

export default {
  name: "my-dash-grid",
  data() {
    return {
      rowHeight: 1,
      colNum: 1000,
      css: {},
      bPoint: {}
    };
  },
  props: {
    mode: {
      type: String,
      default() {
        return "show";
      }
    },
    type: {
      type: String,
      default() {
        return "0";
      }
    },
    layout: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted(){
    this.$nextTick(()=>{
         setTimeout(()=>{
          window.dispatchEvent(new Event('resize'));
        },300)
    })
  },
  computed: {
    layoutList() {
      this.layout.forEach(item => {
        if (bi.dash.data.fullscreen) {
          item.x = 0;
          item.y = 0;
          item.w = 1000;
          item.h = window.innerHeight;
        }
      });

      // console.log(bi.dash);
      // console.log(this.layout);
      return this.layout;
    },
    theme() {
      if (!bi.dash.data.theme) {
        bi.dash.data.theme = {};
      }

      return bi.dash.data.theme || {};
    },
    gridMargin() {
      let  _margin = [0, 0];
      if (this.type == "1") {
        _margin = [20, 20];
      } 
      // let _margin = [Number(this.theme['margin0'] || 0), Number(this.theme['margin1'] || 0)];
      // console.log(_margin);
      return _margin;
    },
    gridCompact() {
      // console.log("-----------------------------------------------------------------",this.type);
      if (this.type == "1") {
        return true;
      } else {
        return false;
      }
    },
    canMove() {
      return (
        this.mode == "edit" &&
        bi.dash.data.fullscreen != true &&
        bi.user.hasDashAuth()
      );
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
    showPoint(i) {
      if (this.mode == "edit") {
        this.$set(this.bPoint, i, true);
      }
    },
    hidePoint(i) {
      this.$set(this.bPoint, i, false);
    },
    movedEvent(i, newX, newY) {},
    resizedEvent(type) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 500);
    },
    itemClick(index, type) {
      if (this.mode == "show") {
        return false;
      }

      let _item = {
        type: type,
        info: this.layout.filter(el => el.i == index)[0]
      };
      this.$set(bi.dash, "currItem", _item);
    },
    getMinHeight(type) {
      let  minH = bi.dash.components[type].minH[0];
      if (this.type == "1") {
        minH = bi.dash.components[type].minH[1] ;
      }
      return minH || 1;
    }
  },
  components: {
    GridLayout,
    GridItem,
    dashItem
  }
};
</script>