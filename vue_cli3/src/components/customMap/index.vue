<template>
  <div class="baseMap" ref="baseMap"></div>
</template>  

<script>
import AMapUtil from "@/utils/AmapUtil";
export default {
  data() {
    return {
      AMapUtil: new AMapUtil(),
    };
  },
  mounted() {
    // let center = [121.471773, 31.287428]; // 测试用
    // let center = [118.955176, 32.119036]; // 测试用
    let center = [121.489934, 31.398896];
    this.AMapUtil.init(this.$refs.baseMap, {
      mapStyle: "amap://styles/whitesmoke",
      center,
      resizeEnable: true,
      rotateEnable: true,
      pitchEnable: true,
      // zoom: 15,
      zoom: 10,
      pitch: 80,
      // viewMode: "3D", //开启3D视图,默认为关闭
      showBuildingBlock: false,
      expandZoomRange: true,
    });
    let _AMap = this.AMapUtil.getMap();

    this.$store.dispatch("customMap/amapInit", {
      AMapUtil: this.AMapUtil,
      AMap: _AMap,
    });
    console.log("map");
  },
};
</script>

<style lang="scss" scoped>
.baseMap {
  width: 100%;
  height: 100%;
}
</style>