<template>
  <div class="datav-fullscreen">
      <screen :screenData="screenData" :mode="mode" ></screen>
  </div>
</template>
<script>
import "@/components/dash/init";
import screen from "@/components/datav/screen";
export default {
  data() {
    return {
      screenData: {
        sortListBase: {
          width: "160px",
          icon: "el-icon-d-arrow-left",
          selectItem: "图片图层002",
          activei: -1
        },
        zoomsSale: 1,
        dataList: bi.dash.data
      },
      mode:'show'
    };
  },
  created() {
    //请求数据
    let iAutoID = this.$route.params.id || "-1";
    bi.dash.loadData(iAutoID);
  },
  components: {
    screen
  }
};
</script>
<style lang="scss" scoped>
.datav-fullscreen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>


