<template>
  <div class="baseMap" ref="baseMap"></div>
</template>

<script>
import AMapUtil from "@/utils/AmapUtil";
export default {
  data() {
    return {
      AMapUtil: new AMapUtil()
    };
  },
  mounted() {
    let center = [121.471773, 31.287428]; // 测试用
    this.AMapUtil.init(this.$refs.baseMap, {
      center,
      // mapStyle: 'amap://styles/darkblue',
    });
    // this.$emit("initEnd", { AMapUtil: this.AMapUtil, el: this.$refs.baseMap });
  }
};
</script>

<style lang="scss" scoped>
.baseMap {
  width: 500px;
  height: 500px;
  border: 1px solid blue;
  margin: 50px auto;
}
</style>
