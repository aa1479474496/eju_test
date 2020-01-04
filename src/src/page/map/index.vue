<template>
<div>
   <map-header header-title="地产云图"></map-header>
   <map-menu></map-menu>
   <transition name="router-fade" mode="out-in">
     <router-view></router-view>
  </transition>
   
</div>
</template>

<script>
import '@/components/common/amap';
import mapHeader from '@/components/map/mapHeader';
import mapMenu from '@/components/map/mapMenu';
import "@/style/default/map.scss";
import "@/style/theme/black/map.scss";
export default {
  data: function() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  components: {
    mapHeader,
    mapMenu
  },
  watch: {}
};
</script>