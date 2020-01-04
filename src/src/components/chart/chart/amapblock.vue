<template>
  <div :class="'chart-box-wrap chart-theme-' + chartInfo.data.theme" @click.stop="activeIndex=-1">
    <el-amap 
        ref="map"  
        :vid="vid" 
        class="amap-demo"
        :amap-manager="amapManager" 
        :mapStyle="options.mapStyle"  
        :center="Array.isArray(options.center)?options.center:options.center.split(',')" 
        :zoom="options.zoom" 
        :events="options.events"
        :plugin="options.plugin"
        :scrollWheel="options.scrollWheel==true"
    >
      <el-amap-polygon
        v-for="(marker,index) in markerList"
        :key="'polygon-'+index" 
        :path="getPath(marker)"
        :fillColor="getColor(marker)"
        fillOpacity="0.8"
        strokeColor="#6A7786"
        strokeWeight="1"
        strokeOpacity="0.8"
        :events="pevents(index)">
      </el-amap-polygon>
      <el-amap-marker v-for="(marker,index) in markerList" 
        :key="'msg-'+index"
        :position="position"
        :events="mevents(index)" 
        :visible="index==activeIndex"
        z-index="999">
          <div class="contentInfo">
            <div class="contentinner">
              <div class="title" v-if="chartInfo.data.query.fields1.length>1">{{marker.data[chartInfo.data.query.fields1[1].title]}}</div>
              <a v-if="getUrl(marker)" :href="getUrl(marker)" :target="urlTarget" class="seeinfo">查看详情</a>
              <div class="listul">
                <div class="listli" v-for="(item,index) in options.msg" :key="index">
                  <div class="lable">{{item.title}}</div>
                  <div class="value">{{marker[item.title]}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import "@/components/common/amap";
import { AMapManager } from "vue-amap";
import optionCompile from "@/components/chart/com/compile";
export default {
  data() {
    return {
      vid : "amapDemo" + (new Date()).getTime(),
      amapManager: new AMapManager(),
      timer: 0,
      loading: true,
      activeIndex: -1,
      position: [0, 0]
    };
  },
  props: {
    chartInfo: Object
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      let _map = _this.amapManager.getMap();
      if (!_map || typeof _map.plugin != "function") {
        return false;
      }
      clearInterval(_this.timer);
      this.loading = false;
    }, 300);
  },
  computed: {
    options() {
      let _option = optionCompile.run(this.chartInfo);
      // console.log(_option);
      _option['mapStyle'] = bi.dash.getAmapTheme('amap');
      return _option;
    },
    markerList() {
      return this.options['data'];
    },
    urlTarget() {
      return this.options['target'] || null;
    }
  },
  watch: {
    'chartInfo.data.qovalue'(val) {
      console.log('chartInfo.data.qovalue:' + val);
    }
  },
  methods: {
    getUrl(item) {
      let _url = this.options.url || '';
      for (let k in item) {
        _url = _url.replace(new RegExp("\\$" + k, "g"), item[k]);
      }
      //bi.log(_url);
      return _url;
    },
    getPath(marker) {
      if (marker.path.trim() == '') {
        return [];
      }

      let points = marker.path.split(';');
      let polygonArr = [];
      points.forEach(function(point,key){
        let _tmp = point.split(',');
        if (_tmp.length == 2) {
          polygonArr.push(_tmp);
        }
      });

      return polygonArr;
    },
    getPosition(marker) {
      if (marker.path.trim() == '') {
        return [0, 0];
      }

      let points = marker.path.split(';');
      let _maxLat = -9999, _maxLng = -9999;
      let _minLat = 9999, _minLng = 9999;

      points.forEach(function(point,key){
        let _tmp = point.split(',');
        if (_tmp.length == 2) {
          _maxLat = Math.max(_maxLat, _tmp[0]);
          _minLat = Math.min(_minLat, _tmp[0]);
          _maxLng = Math.max(_maxLng, _tmp[1]);
          _minLng = Math.min(_minLng, _tmp[1]);
        }
      });

      return [(_maxLat + _minLat)/2, (_maxLng + _minLng)/2];

    },
    getColor(marker) {
      let _theme = bi.dash.getTheme();
      let _colors = this.options.colors || bi.dash.amapthemes[_theme][this.chartInfo.data.type].colors;
      let _qovalue = this.chartInfo.data.qovalue;
      let _min =  bi.formatData(this.chartInfo.list, 'min', _qovalue);
      let _max = bi.formatData(this.chartInfo.list, 'max', _qovalue);
      let _split = bi.formatSplit(_min, _max, _colors.length);
      let _ret = '';
      let _value = parseInt(marker.data[_qovalue], 10);
      for (let i = 0; i < _colors.length; i++) {
        if (_value < _split.min + _split.split * (i+1)) {
          _ret = _colors[i];
          break;
        }
      }

      //console.log({_qovalue, _min, _max, _split, _value, _ret, _colors});
      return _ret;
    },
    pevents(index) {
      let _this = this;
      return {
        mouseover(e) {
          //console.log('pevents:' + index);
          _this.activeIndex = index;
          _this.position = [e.lnglat.getLng(), e.lnglat.getLat()];
        }
      };
    },
    mevents(index) {
      let _this = this;
      return {
        mouseout() {
          //console.log('mevents:' + index);
          _this.activeIndex = -1;
        }
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.gmapDots {
  display: inline-block;
  border-radius: 60px;
  cursor: pointer;
  vertical-align: middle;
}

.contentInfo {
  background-color: #131c26;
  width: 260px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3), 0 10px 24px 0 rgba(0, 0, 0, 0.3),
    inset 0 -1px 0 0 rgba(81, 130, 227, 0.06);
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 12px solid #131c26;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    position: absolute;
    left: 45%;
    bottom: -10px;
  }
  .contentinner {
    padding: 20px;
    .title {
      color: #fff;
      font-size: 16px;
      display: inline-block;
    }
    .seeinfo {
      color: #2a95de;
      font-size: 14px;
      float: right;
      text-decoration: none;
      cursor: pointer;
    }
    .listul {
      margin-top: 15px;
      .listli {
        display: flex;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #29313a;
        margin-top: 3px;
        font-size: 12px;
        color: #fff;
        .lable{
          width: 60px;
        }
        .value{
          text-align: right;
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>