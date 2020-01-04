<template>
  <div class="screen-container" @click.stop="setPageAttr()">
    <div class="datav-screen-main" >
      <screen :screenData="screenData" :mode="mode" :showType="showType"></screen>
    </div>
  </div>
</template>
<script>
import screen from "./screen";
export default {
  data() {
    return {
      showType:'edit'
    };
  },
  props: {
    screenData: Object,
    mode: {
      type: String,
      default() {
        return "edit";
      }
    }
  },
  computed: {
    dashData() {
      return bi.dash.data;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // window.addEventListener("resize", this.handleResize);
      this.handleResize();
    });
  },
  methods: {
    setPageAttr() {
      bi.dash.currItem.type = "datavPage";
      bi.dash.currItem.info = bi.dash.data;
    },
    handleResize() {
      let _BoxWidth = this.$el.getBoundingClientRect().width;
      let _Boxheight = this.$el.getBoundingClientRect().height;
      let iwidth = parseInt(this.dashData.datav.w);
      let iheight = parseInt(this.dashData.datav.h);
      let scale = 1;
      let baseRatio = _BoxWidth / _Boxheight;
      let _ratio = iwidth / iheight;
      /*
          * _ratio >= baseRatio  宽度等比缩放
          * _ratio > baseRatio  高度等比缩放
          */
      if (iwidth >= _BoxWidth - 100 && _ratio > baseRatio) {
        scale = (_BoxWidth - 100) / iwidth;
      } else if (iheight >= _Boxheight - 100 && _ratio < baseRatio) {
        scale = (_Boxheight - 100) / iheight;
      }
      this.transformOrigin = `50px 50px`;
      this.transform = `scale(${scale})`;
      this.screenData.zoomsSale = parseInt(scale * 100);
    }
  },
  components: {
    screen
  }
};
</script>
<style lang="scss" scoped>
.screen-container {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 35px;
  overflow: auto;
  box-sizing: border-box;
  .datav-screen-main {
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    align-self: start;
    width: 100%;
  }
}

::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:vertical:active {
  background-color: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar {
  overflow: visible;
  background-color: transparent;
  width: 6px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #656565;
  min-height: 10px;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:vertical:hover {
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:vertical:active {
  border-radius: 5px;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-track-piece {
  margin: 10px 0;
  border-radius: 5px;
}
</style>
