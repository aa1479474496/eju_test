<template>
  <div>
    <div class="amap-page-container">
      <div class="selectWrap">
        <map-selectdown v-model="yearitem">
          <span slot="icon" class="el-icon-date"></span>
          <option v-for="(item,index) in yearData" :key="index" :value="item.sValue">{{item.sName1}}</option>
        </map-selectdown>
      </div>
      <el-amap ref="map" vid="amapDemo" :mapStyle="mapStyle" :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events"
        :plugin="plugin" class="amap-demo">
        <el-amap-marker v-for="(marker,index) in markersPoint" :key="'point-' + index" :position="marker.position" :events="marker.events" :offset="marker.offset"
          z-index="99">
          <div class="gmapDots" :style="{ backgroundColor: marker.color, width: marker.size + 'px' ,height:marker.size + 'px' }"></div>
        </el-amap-marker>

        <el-amap-marker v-for="(marker,index) in markersText" :key="'msg-' + index" :position="marker.position"  :events="marker.events"  :visible="!!marker.visible"
          :offset="marker.offset" z-index="999">
          <div class="contentInfo">
            <div class="contentinner">
              <div class="cityname">{{marker.sCity}}</div>
              <router-link :to="getUrl(marker)" class="seeinfo">查看详情</router-link>
              <div class="tflags">
                <!-- <div class="flag1 fg1">{{marker.sType}}</div> -->
                <div class="flag1 fg2">{{marker.sLevel}}级</div>
                <div class="flag1 fg3">{{marker.iTotal}}</div>
              </div>
              <div class="listul">
                <div class="listli">
                  <span class="left">经济支持力</span>
                  <span class="right">{{marker.iGDP}}</span>
                </div>
                <div class="listli">
                  <span class="left">城市吸引力</span>
                  <span class="right">{{marker.iCharm}}</span>
                </div>
                <div class="listli">
                  <span class="left">市场消化力</span>
                  <span class="right">{{marker.iDigest}}</span>
                </div>
                <div class="listli">
                  <span class="left">居民支付力</span>
                  <span class="right">{{marker.iPay}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-amap-marker>


      </el-amap>
      <div class="maptips">
        <el-tooltip class="item" v-for="(item,index) in markersStyle" :key="index" effect="dark" :content="'取值范围在'+item.min+'和'+item.max+'之间'"
          placement="top">
          <div class="mapDots" :style="{ backgroundColor: item.color, width: item.size/2 + 'px' ,height:item.size/2 + 'px' }"></div>
        </el-tooltip>
      </div>
    </div>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import mapSelectdown from "@/components/map/mapSelectDown";
import api from "@/server/api";
import { AMapManager } from "vue-amap";
export default {
  data: function() {
    return {
      zoom: 5,
      center: [110.59996, 34.986802], //地图中心点
      markersPoint: [], //覆盖物点集合
      markersText: [], //覆盖物点集合
      amapManager: new AMapManager(),
      mapStyle: "amap://styles/grey",
      markersStyle: [
        {
          color: "rgba(148, 241, 203, 0.7)",
          size: 10,
          min: 0,
          max: 1
        },
        {
          color: "rgba(23, 208, 224, 0.7)",
          size: 20,
          min: 1,
          max: 2
        },
        {
          color: "rgba(45, 168, 250, 0.7)",
          size: 30,
          min: 2,
          max: 3
        },
        {
          color: "rgba(54, 86, 206, 0.7)",
          size: 40,
          min: 3,
          max: 4
        },
        {
          color: "rgba(100, 95, 231, 0.7)",
          size: 60,
          min: 4,
          max: 5
        }
      ],
      yearData: [],
      yearitem: "2016",
      markersData: [],
      plugin: [
        {
          pName: "ToolBar",
          position: "RT",
          offset: [40, 90]
        }
      ],
      events: {
        click: e => {
          this.markersText.forEach(marker => {
            marker.visible = false;
          });
        }
      }
    };
  },
  created() {
    //获取年份数据
    this.getYearList();
  },
  mounted() {},
  methods: {
    getUrl(item) {
      let _url = item.sUrl;
      for (let k in item) {
        _url = _url.replace(new RegExp("\\$" + k, "g"), item[k]);
      }
      //bi.log(_url);
      return _url;
    },
    async getYearList() {
      let obj = {
        db: "DCAI",
        tbl: "t_option",
        fields: "sName1,sDb,sTable,sField,sValue,sUrl",
        filters2: {
          sType: "city_year"
        }
      };
      let res = await api.query(obj);
      if (res.status) {
        this.yearData = res.data;
        //获取城市数据
        this.getCityData();
      } else {
        bi.log(res, "接口报错");
      }
    },
    async getCityData() {
      let self = this;
      let yearList = {};
      this.yearData.forEach((item, index) => {
        if (item.sValue == this.yearitem) {
          yearList = item;
        }
      });
      let obj = {
        db: yearList.sDb,
        tbl: yearList.sTable,
        fields: "*",
        filters2: {
          sYear: yearList.sValue
        }
      };

      // console.log( this.yearData)


      this.markersText.splice(0);
      this.markersPoint.splice(0);
      let res = await api.query(obj);
      if (res.status) {
        let cityData = res.data,
          ids = 0;
        for (let i in cityData) {
          ids += 0.01;
          let item = cityData[i];
          item.iTotal = parseFloat(item.iTotal);
          if (item.iTotal >= 0 && item.iTotal <= 1) {
            item.color = this.markersStyle[0].color;
            item.size = this.markersStyle[0].size;
          } else if (item.iTotal > 1 && item.iTotal <= 2) {
            item.color = this.markersStyle[1].color;
            item.size = this.markersStyle[1].size;
          } else if (item.iTotal > 2 && item.iTotal <= 3) {
            item.color = this.markersStyle[2].color;
            item.size = this.markersStyle[2].size;
          } else if (item.iTotal > 3 && item.iTotal <= 4) {
            item.color = this.markersStyle[3].color;
            item.size = this.markersStyle[3].size;
          } else if (item.iTotal > 4 && item.iTotal <= 5) {
            item.color = this.markersStyle[4].color;
            item.size = this.markersStyle[4].size;
          }
          this.markersPoint.push({
            sUrl: yearList.sUrl,
            position: [Number(item.sLng), Number(item.sLat)],
            events: {
              click() {
                self.markersText.forEach(marker => {
                  marker.visible = false;
                });
                self.$nextTick(() => {
                  self.markersText[i].visible = true;
                });
                self.center = [Number(item.sLng)-2, Number(item.sLat)+3];
              }
            },
            offset: [-item.size / 2, -item.size / 2.5],
            ...item
          });
          this.markersText.push({
            sUrl: yearList.sUrl,
            position: [Number(item.sLng), Number(item.sLat)],
            visible: false,
            offset: [-130, -286],
            events: {
              mouseout() {
                self.markersText.forEach(marker => {
                  marker.visible = false;
                });
              }
            },
            ...item
          });
        }
      } else {
        bi.log(res, "接口报错");
      }
    }
  },
  components: {
    mapSelectdown
  },
  watch: {
    yearitem(val) {
      //获取城市数据
      this.getCityData();
    }
  }
};
</script>

