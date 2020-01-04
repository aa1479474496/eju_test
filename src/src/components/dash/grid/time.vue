<template>
  <div ref="nowtimes" class="times" :style="{'justify-content':align,'align-items':itemData.data.alignItems || 'normal'}">
      <i class="iconfont icon-msnui-time-detail inlineblock" :style="styleObj"></i>
      &nbsp;
      <span class="tdtimes inlineblock">{{dataTime}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataTime: ""
    };
  },
  components: {},
  mounted() {
    this.toptimedata();
  },
  props: {
    itemData: Object
  },
  computed: {
    styleObj() {
      let _iconFont = this.itemData.data;
      return `font-size:${_iconFont["iconSize"]}px ;color: ${
        _iconFont["iconColor"]
      }`;
    },
    align() {
      let _css = this.itemData.css;
      if (_css["text-align"] == "justify") {
        return "space-between";
      } else {
        return _css["text-align"];
      }
    }
  },
  methods: {
    toptimedata() {
      let _this = this;
      let onetime = setInterval(() => {
        _this.smailTimes(_this);
        clearInterval(onetime);
        _this.toptimedata();
      }, 1000);
    },
    smailTimes(_this) {
      let format = _this.itemData.data.format
        ? _this.itemData.data.format
        : "y-m-d h:i:s";
      _this.dataTime = bi.parseTime(new Date().getTime(), format);
    },
    paddingLeftZero(str) {
      return `00${str}`.substr((str + "").length);
    }
  }
};
</script>
<style lang="scss" scoped>
.parent {
  position: relative;
}
.times {
  display: flex;
  height: 100%;
}
</style>

