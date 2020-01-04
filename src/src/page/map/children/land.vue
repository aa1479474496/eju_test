<template>
    <div class="amap-page-container">

        <div class="selectWrap">
          <map-selectdown v-model="modelVal.mcitys">
            <option v-for="(item,index) in citys"  :key="index">{{item.sName2}}</option>
          </map-selectdown>

          <map-selectdown v-model="modelVal.mused">
            <option v-for="(item,index) in used"  :key="index" :value="item.sValue">{{item.sName2}}</option>
          </map-selectdown>

          <map-selectdown v-model="modelVal.mstatus">
            <option v-for="(item,index) in status"  :key="index" :value="item.sValue">{{item.sName2}}</option>
          </map-selectdown>

          <map-selectdown v-model="modelVal.sYear">
            <option v-for="(item,index) in defaultYear"  :key="index" :value="item.value">{{item.name}}</option>
          </map-selectdown>
        </div>

        <el-amap 
            ref="map"  
            vid="amapDemo" 
            :zoom="zoom" 
            :mapStyle="mapStyle"  
            :center="center" 
            :amap-manager="amapManager" 
            :events="events" 
            :plugin="plugin"
            v-loading="loading" element-loading-text="拼命加载中..."  element-loading-background="transparent"
        >
              <el-amap-marker 
                  v-for="(marker, index) in markersIcon" 
                  :position="marker.position" 
                  :events="marker.events" 
                  :visible="marker.visible" 
                  :vid="index"
                  :icon="blueIcon"
                  :key="'icon'+index"
                  :z-index="99"
              >
              </el-amap-marker>

              <el-amap-marker 
                  v-for="(marker, index) in markersText" 
                  :position="marker.position" 
                  :visible="marker.visible" 
                  :offset="marker.offset"
                  :events="marker.events" 
                  :vid="index"
                  :key="'msg'+index"
                  :z-index="999"
              >
               <div class="prompt" >
                    <div class="h2">{{marker.idatas.sLandName}}</div>
                    <router-link :to="getUrl(marker.idatas)" class="link">查看详情</router-link>
                    <div class="ul">
                        <div class="li">
                           <div class="label">建筑用地面积</div>
                           <div class="value">{{marker.idatas.iBuildArea}}㎡</div>
                        </div>
                        <div class="li">
                           <div class="label">容积率</div>
                           <div class="value">{{marker.idatas.sRatio}}</div>
                        </div>
                        <div class="li">
                           <div class="label">公告时间</div>
                           <div class="value">{{marker.idatas.sPushDate}}</div>
                        </div>
                        <div class="li">
                           <div class="label">起始价格</div>
                           <div class="value">{{marker.idatas.fStartPrice}}㎡/元</div>
                        </div>
                        <div class="li">
                           <div class="label">成交价格</div>
                           <div class="value">{{marker.idatas.fEndPrice}}㎡/元</div>
                        </div>
                        <div class="li">
                           <div class="label">成交时间</div>
                           <div class="value">{{marker.idatas.sSealDate}}</div>
                        </div>
                        <div class="li">
                           <div class="label">溢价率</div>
                           <div class="value">{{marker.idatas.fOverPrice}}</div>
                        </div>
                    </div>
                    <div class="bottoms"></div>
               </div>
              </el-amap-marker>
        </el-amap>
                

     <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>   
    </div>
</template>

<script>
import { AMapManager } from "vue-amap";
import api from "@/server/api";
import mapSelectdown from "@/components/map/mapSelectDown";
let amapManager = new AMapManager();
export default {
  data() {
    return {
      zoom: 11,
      amapManager,
      loading: false,
      blueIcon: "/static/mapMark_blue.png",
      center: [113.236692, 23.120126],
      mapStyle: "amap://styles/grey",
      events: {
        click: e => {
          this.markersText.forEach(marker => {
            marker.visible = false;
          });
        }
      },
      plugin: [
        {
          pName: "ToolBar",
          position: "RT",
          offset: [40, 90]
        }
      ],
      markersIcon: [],
      markersText: [],
      citys: [],
      used: [],
      status: [],
      modelVal: {
        mcitys: "广州",
        mused: "",
        mstatus: "",
        sYear:'2017年'
      },
      defaultYear:[
        {name:'供应年份：2017年',value:'2017年'},
        {name:'供应年份：2016年',value:'2016年'},
        {name:'供应年份：2015年',value:'2015年'},
        {name:'供应年份：2014年',value:'2014年'},
        {name:'供应年份：2013年',value:'2013年'},
        {name:'供应年份：2012年',value:'2012年'}
      ]
    };
  },
  created() {
    this.getSeletData();
  },
  mounted() {
    this.setMapData([]);
  },
  components: {
    mapSelectdown
  },
  methods: {
    getUrl(item) {
      let _url = "";
      this.citys.forEach(city => {
        if (city.sName2 == this.modelVal.mcitys) {
          _url = city.sUrl;
        }
      });
      for (let k in item) {
        _url = _url.replace(new RegExp("\\$" + k, "g"), item[k]);
      }
      return _url;
    },
    getSeletData() {
      let obj = {
        db: "DCAI",
        tbl: "t_option",
        fields: "sName1,sName2,sDb,sTable,sField,sValue,sUrl",
        filters2: { sType: "land" }
      };
      api.query(obj).then(res => {
        for (let i in res.data) {
          if (res.data[i].sName1 == "sUseType") {
            this.used.push(res.data[i]);
          }
          if (res.data[i].sName1 == "sSaleStatus") {
            this.status.push(res.data[i]);
          }
          if (res.data[i].sName1 == "sCityName") {
            this.citys.push(res.data[i]);
          }
        }
      });
    },
    getMapData() {
      this.loading = true;
      this.markersIcon.splice(0);
      this.markersText.splice(0);
      let obj = {
        db: "DCAI",
        tbl: "t_land",
        fields: "*",
        filters2: {
          sCityName: this.modelVal.mcitys,
          sUseType: this.modelVal.mused,
          sSaleStatus: this.modelVal.mstatus,
          "sPushDate.year": this.modelVal.sYear
        }
      };

      //"sPushDate.year": '2017年',
      //filters1: "sPushDate>='xx' AND sPushDate<='xx'",

      api.query(obj).then(res => {
        this.setMapData(res.data);
        this.loading = false;
      });
    },
    setMapData(arr) {
      let markersIcon = [];
      let markersText = [];
      let self = this;
      for (let i = 0; i < arr.length; i++) {
        markersIcon.push({
          position: [Number(arr[i].fAMapLng), Number(arr[i].fAMapLat)],
          events: {
            click() {
              self.markersText.forEach(marker => {
                marker.visible = false;
              });
              self.$nextTick(() => {
                self.markersText[i].visible = true;
              });
              self.center = [
                Number(arr[i].fAMapLng) - 0.02,
                Number(arr[i].fAMapLat) + 0.04
              ];
            }
          },
          visible: true
        });

        markersText.push({
          position: [Number(arr[i].fAMapLng), Number(arr[i].fAMapLat)],
          visible: false,
          offset: [-130, -390],
          events: {
            mouseout() {
              // self.markersText.forEach(marker => {
              //   marker.visible = false;
              // });
            }
          },
          idatas: arr[i]
        });
      }
      this.markersIcon = markersIcon;
      this.markersText = markersText;
    }
  },
  watch: {
    modelVal: {
      deep: true,
      immediate: true,
      handler() {
        this.getMapData();
      }
    },
    "modelVal.mcitys"(val) {
      this.$nextTick(() => {
        this.amapManager.getMap().setCity(val);
      });
    }
  }
};
</script>


