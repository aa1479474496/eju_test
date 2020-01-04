<template>
  <div class="amap-page-container">
    <div class="selectWrap">
      <map-select-down v-model="currCity">
        <option v-for="(item,index) in aCityData" :key="index" :value="item.sName2">{{item.sName2}}</option>
      </map-select-down>
      <map-select-down v-model="currOption1">
        <option v-for="(item,index) in aOption1" :key="index" :value="item">{{item}}</option>
      </map-select-down>
      <map-select-down v-model="currOption2">
        <option v-for="(item,index) in aOptionData[currOption1]" :key="index" :value="index">{{item.sName2}}</option>
      </map-select-down>
    </div>
    <el-amap ref="map" vid="amapDemo" :mapStyle="mapStyle" :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events"
      :plugin="plugin" class="amap-demo">
      <el-amap-marker :position="msg.position" :visible="msg.visible"  :offset="msg.offset"  :events="msg.events"  z-index="999">
        <div class="prompt blockpt">
          <div class="h2">{{msg.info}}</div>
          <router-link class="link" v-show="msg.sAreaName" :to="`/map/block/dash/444?_dfilter=sAreaName:${msg.sAreaName};sBlockName:${msg.sBlockName}`"
           >查看详情>></router-link>
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
  import {
    AMapManager
  } from "vue-amap";
  import mapSelectDown from "@/components/map/mapSelectDown";
  import api from "@/server/api";
  let amapManager = new AMapManager();
  export default {
    data: function () {
      return {
        amapManager,
        zoom: 10,
        events: {
          click: e => {
            this.msg.visible = false;
          }
        },
        timer: 0,
        loading: true,
        activeIndex: -1,

        mapStyle: "amap://styles/grey",
        center: [113.257291, 23.149415],
        colors: [
          "#94f1cb",
          "#17d0e0",
          "#2da8fa",
          "#3656ce",
          "#645fe7",
          "#bc53e2"
        ],
        msg: {
          sAreaName: "",
          sBlockName: "",
          info: "",
          visible: false,
          position: [113.257291, 23.149415],
          offset:[-100, -100],
          events:{
            mouseout : e => {
              this.msg.visible = false;
            }
          }
        },

        // API请求配置
        reqblock: {
          db: "CRIC",
          tbl: "t_cric_block",
          fields: "iAutoID,sBlockName,sBoundary,iLat,iLng,sAreaName",
          filters2: {
            sCityName: ""
          }
        },
        reqoption: {
          db: "DCAI",
          tbl: "t_option",
          fields: "sName1,sName2,sDb,sTable,sField,sValue",
          filters2: {
            sType: "block"
          }
        },
        reqdata: {
          db: "DCAI",
          tbl: "t_dw_block_ditu",
          fields: "*",
          filters2: {
            sCity: "***"
          },
          ftype: "all",
          fkey: "sZoneName"
        },

        // 当前选中的option
        currCity: "广州",
        currOption1: "",
        currOption2: "",

        // 各种数据
        aCityData: [],
        aOption1: [],
        aOptionData: {},
        aMapData: [],
        aBlockData: {},
        plugin: [{
          pName: "ToolBar",
          position: "RT",
          offset: [40, 90]
        }]
      };
    },
    props: {
      aDbData: Array
    },
    created() {
      if (this.aCityData.length == 0) {
        this.refreshOption();
      }
      if (this.aMapData.length == 0) {
        this.refreshMap();
      }
      this.refreshData();
    },
    watch: {
      currCity(val) {
        this.amapManager.getMap().setCity(val);
      },
      currOption2(val) {
        this.drawMap();
      }
    },
    methods: {
      getPosition(marker) {
        if (marker.path.trim() == "") {
          return [0, 0];
        }

        let points = marker.path.split(";");
        let _maxLat = -9999,
          _maxLng = -9999;
        let _minLat = 9999,
          _minLng = 9999;

        points.forEach(function (point, key) {
          let _tmp = point.split(",");
          if (_tmp.length == 2) {
            _maxLat = Math.max(_maxLat, _tmp[0]);
            _minLat = Math.min(_minLat, _tmp[0]);
            _maxLng = Math.max(_maxLng, _tmp[1]);
            _minLng = Math.min(_minLng, _tmp[1]);
          }
        });

        return [(_maxLat + _minLat) / 2, (_maxLng + _minLng) / 2];
      },
      getColor(marker) {
        let _theme = this.chartInfo.data.theme;
        let _colors =
          this.options.colors ||
          bi.dash.amapthemes[_theme][this.chartInfo.data.type].colors;
        let _qovalue = this.chartInfo.data.qovalue;
        let _min = bi.formatData(this.chartInfo.list, "min", _qovalue);
        let _max = bi.formatData(this.chartInfo.list, "max", _qovalue);
        let _split = bi.formatSplit(_min, _max, _colors.length);
        let _ret = "";
        let _value = parseInt(marker[_qovalue], 10);
        for (let i = 0; i < _colors.length; i++) {
          if (_value < _split.min + _split.split * (i + 1)) {
            _ret = _colors[i];
            break;
          }
        }

        //console.log({_qovalue, _min, _max, _split, _value, _ret, _colors});
        return _ret;
      },
      refreshMap() {
        this.reqblock.filters2.sCityName = this.currCity;
        api.query(this.reqblock).then(res => {
          if (res.status) {
            res.data.forEach(function (item, index) {
              let points = item.sBoundary.split(";");
              let polygonArr = [];
              points.forEach(function (point, key) {
                polygonArr.push(point.split(","));
              });
              item["points"] = polygonArr;
            });
            this.aMapData = res.data;
            this.drawMap();
          }
        });
      },
      refreshOption() {
        let self = this;
        api.query(this.reqoption).then(res => {
          if (res.status) {
            let citys = [];
            let option1 = [];
            let options = {};
            let first = true;
            res.data.forEach(function (item, index) {
              if (item.sName1 == "sCityName") {
                citys.push(item);
              } else if (!options[item.sName1]) {
                option1.push(item.sName1);
                options[item.sName1] = [];
                if (first) {
                  self.currOption1 = item.sName1;
                  self.currOption2 = 0;
                  first = false;
                }
              }
            });
            res.data.forEach(function (item, index) {
              if (options[item.sName1]) {
                options[item.sName1].push(item);
              }
            });
            self.aCityData = citys;
            self.aOptionData = options;
            self.aOption1 = option1;
          }
        });
      },
      refreshData() {
        this.reqdata.filters2 = {
          sCity: this.currCity
        };
        api.query(this.reqdata).then(res => {
          if (res.status) {
            this.aBlockData = res.data;
            this.drawMap();
          }
        });
      },
      drawMap() {
        if (
          Object.keys(this.aBlockData).length == 0 ||
          this.aMapData.length == 0
        ) {
          return;
        }

        // 计算颜色
        let field = this.aOptionData[this.currOption1][this.currOption2][
          "sField"
        ];
        let imax = 0;
        for (let k in this.aBlockData) {
          imax = Math.max(parseInt(this.aBlockData[k][field]), imax);
        }
        let colorCal = imax / this.colors.length;

        // 画多边形
        let self = this;
        let polygons = [];
        this.aMapData.forEach(function (item, index) {
          let value =
            (self.aBlockData[item.sBlockName] &&
              self.aBlockData[item.sBlockName][field]) ||
            0;
          item.sColor = self.colors[Math.ceil(value / colorCal)] || "#CCC";
          var polygon = new AMap.Polygon({
            path: item.points, //设置多边形边界路径
            strokeColor: "#6A7786", //线颜色
            strokeOpacity: 0.8, //线透明度
            strokeWeight: 1, //线宽
            fillColor: item.sColor, //填充色
            fillOpacity: 0.8 //填充透明度
          });
          polygon.setMap(amapManager.getMap());
          polygon.on("click", function (e) {
            let unit =
              self.aOptionData[self.currOption1][self.currOption2]["sValue"];
            let value =
              (self.aBlockData[item.sBlockName] &&
                self.aBlockData[item.sBlockName][field]) ||
              "";
            self.msg.info = item.sBlockName + ": " + (value == "" ? "未知" : value + unit);
            self.msg.sAreaName = item.sAreaName;
            self.msg.sBlockName = item.sBlockName;
            let position = [e.lnglat.getLng(), e.lnglat.getLat()];
            if (item.iLat != 0.0) {
              position = [item.iLng, item.iLat];
            }
            self.msg.position = position;
            self.msg.visible = true;
            let options = this.getOptions();
            options.fillColor = "#CCC";
            this.setOptions(options);
          });
        });
      }
    },
    components: {
      mapSelectDown
    }
  };

</script>

<style lang="scss" scoped>
.blockpt {
  width: 200px;
  height: 90px;
  padding: 20px 25px;
  .h2{
    font-size: 16px ;
  }
  .bottoms {
    left:80px 
  }
  .link {
    font-size: 14px;
  }
}
</style>

