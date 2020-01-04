<template>
    <div class="placesearch">
      <div class="surrounds" :style="{'bottom':hasTitle}">
          <div class="mpcontainer" >
              <div class="titles">
                <div>{{itemData.data.mapTitle}}</div>
              </div>
              <el-amap 
                  :vid="vid" 
                  :center="center" 
                  :amap-manager="amapManager" 
                  :plugin="plugin"
                  :map-style="mapStyle"
                  :scrollWheel="false"
                  :zoom="zoom" 
                  class="amap-demo"
              >
              </el-amap>
          </div>
          <div class="mpopt">
               <div class="distanceBox">
                  <div class="label">范围</div>
                  <select v-model="distanceMod">
                      <option v-for="(item,index) in  distanceArr" :key="index" :value="item.value">{{item.name}}</option>
                  </select>
                  <div class="b"></div>
               </div>
                <div class="li"  v-for="(item ,index) in mapCondition" :key="index"   @click="checkOption(index)">
                  <div 
                    class="item"  
                    :style="{background:getBackgroundUrl(item,index)}" >
                  </div>
                  <div>{{item.name}}</div>
                </div>
          </div>
        </div>
    </div>
</template>
<script>
import '@/components/common/amap';
import { AMapManager } from 'vue-amap';
import "@/style/default/mapLocal.scss";
import "@/style/theme/black/mapLocal.scss";
export default {
  data() {
    return {
      amapManager: new AMapManager(),
      vid: "amapDemo" + (new Date()).getTime(),
      zoom: 16,
      center: [121.496336, 31.239162],
      plugin: ["ToolBar"],
      mapCondition: [
        {
          name: "周边楼盘",
          keyword: "楼盘",
          defaultIcon: "loupan-b.png",
          activeIcon: "loupan-a.png"
        },
        // {
        //   name: "周边地块",
        //   keyword: "土地",
        //   defaultIcon: "dikuai-b.png",
        //   activeIcon: "dikuai-a.png"
        // },
        {
          name: "交通",
          keyword: "公交|地铁",
          defaultIcon: "jiaotong-b.png",
          activeIcon: "jiaotong-a.png"
        },
        {
          name: "娱乐",
          keyword: "ktv|网吧|会所",
          defaultIcon: "yule-b.png",
          activeIcon: "yule-a.png"
        },
        {
          name: "超市",
          keyword: "超市|便利店",
          defaultIcon: "chaoshi-b.png",
          activeIcon: "chaoshi-a.png"
        },
        {
          name: "餐饮",
          keyword: "餐饮",
          defaultIcon: "canying-b.png",
          activeIcon: "canying-a.png"
        },
        {
          name: "银行",
          keyword: "银行",
          defaultIcon: "yinhang-b.png",
          activeIcon: "yinhang-a.png"
        },
        {
          name: "医院",
          keyword: "医院|诊所|药房",
          defaultIcon: "yiyuan-b.png",
          activeIcon: "yiyuan-a.png"
        },
        {
          name: "公园",
          keyword: "公园",
          defaultIcon: "gongyuan-b.png",
          activeIcon: "gongyuan-a.png"
        },
        {
          name: "学校",
          keyword: "幼儿园|小学|中学|大学",
          defaultIcon: "xuexiao-b.png",
          activeIcon: "xuexiao-a.png"
        }
      ],
      defaultIndex: 0,
      distanceMod: 1000,
      distanceArr: [
        { name: "500米", value: 500 },
        { name: "1000米", value: 1000 },
        { name: "1500米", value: 1500 },
        { name: "2000米", value: 2000 },
        { name: "5000米", value: 5000 },
        { name: "10000米", value: 10000 }
      ]
    };
  },
  methods: {
    setPlaceSearch(type, keyword, cpoint, distance) {
      let _this = this;
      let map = _this.amapManager.getMap();
      map && map.clearMap();
      
      if (typeof(AMap) == 'undefined') {
        return false;
      }
      
      AMap.service(["AMap.PlaceSearch"], function() {
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 20,
          type: type,
          pageIndex: 1,
          map: map
        });
        placeSearch.searchNearBy(keyword, cpoint, distance, function(
          status,
          result
        ) {
        });
        
        _this.addMarker(cpoint);
      });
    },
    addMarker(position) {
      let map = this.amapManager.getMap();
      let _marker = new AMap.Marker({
        icon: "/static/mapMark_yellow.png",
        position: position,
        offset: (new AMap.Pixel(-17.5,-62)),
        animation: "AMAP_ANIMATION_DROP"
      });
      _marker.setMap(map);
    },
    checkOption(index) {
      this.defaultIndex = index;
      this.resetMap();
    },
    setCenter() {
      let _arr = [];
      if (this.mapCenter) {
        _arr = this.mapCenter.split(",");
      }
      if (_arr.length != 2) {
        return false;
      }
      this.center = [Number(_arr[0]), Number(_arr[1])];
      this.resetMap();
    },
    resetMap() {
      this.setPlaceSearch(
        this.mapCondition[this.defaultIndex].name,
        this.mapCondition[this.defaultIndex].keyword,
        this.center,
        this.distanceMod
      );
    },
    getBackgroundUrl(item,index){
      let _icon = this.defaultIndex == index ? item.activeIcon : item.defaultIcon;
      let _theme = bi.dash.getTheme();
      return `url(/static/surround/${_theme}/${_icon})`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setCenter();
      setTimeout(() => {
        this.resetMap();
      }, 300);
    });
  },
  props: {
    itemData: Object
  },
  computed: {
    mapStyle() {
      return bi.dash.getAmapTheme();
    },
    mapCenter() {
      return bi.dash.formatText(this.itemData.data.mapCenter);
    },
    hasTitle(){
      if(!this.itemData.data.mapTitle){
        return '10px';
      }
      return !this.itemData.data.mapTitle.trim() ? '10px':'70px';
    }
  },
  watch: {
    mapCenter() {
      this.setCenter();
    },
    distanceMod() {
      this.resetMap();
    }
  }
};
</script>

