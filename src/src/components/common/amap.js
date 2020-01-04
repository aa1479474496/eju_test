
import Vue from 'vue'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  v: '1.4.6',
  key: '4bfffe2dca93bbf875de0181774419c4',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'MarkerClusterer', 'AMap.PlaceSearch', 'AMap.PolyEditor','AMap.Heatmap']
});