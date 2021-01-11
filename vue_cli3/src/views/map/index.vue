<template>
  <div>
    <p>map</p>
    <router-link to="/map/basic">map_basic</router-link>
    <router-link to="/account" style="margin-left:20px">account</router-link>


    <div class="map_view">
        <customMap></customMap>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

import customMap from "@/components/customMap/index.vue";
export default {
  components: {
    customMap,
  },
  computed: {
    ...mapState({
      AMapUtil: (state) => state.customMap.AMapUtil,
    }),
  },
  destroyed() {
    console.log('desssss');
    this.AMapUtil && this.AMapUtil.destroyMap && this.AMapUtil.destroyMap();
  },
};
</script>

<style lang="scss" scoped>
  .map_view {
    height: 500px;
  }
</style>