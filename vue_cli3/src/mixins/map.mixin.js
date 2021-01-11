import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      AMapUtil: state => state.customMap.AMapUtil,
      AMap: state => state.customMap.AMap,
    })
  },

  async created() {
    await this.$store.dispatch("customMap/initEnd");
    this.render && this.render();

  
    // console.log('amap:', this.AMapUtil);
  },

  beforeDestroy() {
    this.AMapUtil.clearAllOverlays();
  }


}