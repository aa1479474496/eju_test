<template>
  <div :class="'chart-box-wrap chart-theme-' + chartInfo.data.theme">
    <el-amap 
        ref="map"  
        :vid="vid" 
        v-if="mapflag"
        class="amap-demo"
        :amap-manager="amapManager" 
        :mapStyle="options.mapStyle"  
        :center="Array.isArray(options.center)?options.center:options.center.split(',')" 
        :zoom="options.zoom" 
        :events="options.events"
        :plugin="options.plugin"
        :scrollWheel="options.scrollWheel==true"
        :dragEnable="options.dragEnable"
        :viewMode="options.viewMode?'3D':'2D'"
        :pitch="options.pitch"
    >
    </el-amap>
  </div>
</template>

<script>
import '@/components/common/amap';
import { AMapManager } from 'vue-amap';
import optionCompile from '@/components/chart/com/compile'
export default {
  data() {
    return {
      vid : "amapDemo" + (new Date()).getTime(),
      amapManager: new AMapManager(),
      timer: 0,
      heatmap: null,
      mapflag:true
    };
  },
  props: {
    chartInfo: Object
  },
  mounted() {},
  computed: {
    options() {
      let _option = optionCompile.run(this.chartInfo);
      // console.log(_option);
      _option['mapStyle'] = bi.dash.getAmapTheme('amap');
      return _option;
    }
  },
  watch: {
   options: {
      deep: true,
      immediate:true,
      handler(val, old) {
        this.mapflag=false;
        setTimeout(()=>{
          this.mapflag=true;
          this.initfn();
        })
      }      
    }
  },
  methods: {
    initfn(){
      let _this = this;
      this.timer = setTimeout(()=>{
        let _map = _this.amapManager.getMap();
        if (!_map || typeof _map.plugin != 'function') {
          return false;
        }
        clearTimeout(_this.timer);
        _this.heatmap = new AMap.Heatmap(_map);
        _this.redraw();
      }, 300);
    },
    redraw() {
      if (! this.heatmap) {
        return false;
      }
      
      //console.log("redraw heatmap!!!!!");
      let _option = optionCompile.run(this.chartInfo);

      // 清理老数据
      //_map.clearMap();
      //console.log(_option);
      this.heatmap.setDataSet({data:[]});
      this.heatmap.setOptions(_option.heatmap);
      //设置数据集
      this.heatmap.setDataSet({
          data: _option.data,
          max: 100
      });
    }
  }
};
</script>