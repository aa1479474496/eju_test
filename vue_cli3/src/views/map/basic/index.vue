<template>
  <div>basic</div>
</template>

<script>
let filter = [];
let test = false;
import mapMixin from "@/mixins/map.mixin.js";
import { citys } from "../mockMap.js";
export default {
  mixins: [mapMixin],

  data() {
    return {
      citys: _.cloneDeep(citys),
    };
  },

  mounted() {
    if (!test) {
      test = true;
      console.log('test empty');
    }
    else {
      console.log('init');
    }

    // if (!filter.length) {
    //   filter.push(1);
    //   console.log('empty');
    // }
    // else {
    //   console.log('2222');
    // }
    // console.log("this.citys:::", this.citys);
    let _lnglat = this.citys[0].lnglat;
    let tran = new AMap.LngLat(_lnglat[0], _lnglat[1]);
    // console.log("-----", tran);
  },

  methods: {
    render() {
      var style = [
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(21, 21),
        },
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass1.png",
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(17, 17),
        },
        {
          url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
          anchor: new AMap.Pixel(3, 3),
          size: new AMap.Size(5, 5),
        },
      ];

      var mass = new AMap.MassMarks(this.citys, {
        opacity: 0.8,
        zIndex: 111,
        cursor: "pointer",
        style: style,
      });

      // console.log('mmmmm', mass);

      mass.on("click", function (e) {
        let { data } = e;
        console.log("eeee", e);
        console.log("__data", data);
        let markerLngLat = e.data.lnglat;

        let index = citys.findIndex((city) => {
          let _lnglat = city.lnglat;
          let tran = new AMap.LngLat(_lnglat[0], _lnglat[1]);
          return _.isEqual(markerLngLat, tran);
        });

          console.log("000000", index);
        if (index > -1) {
          let _data = _.cloneDeep(citys);
          let current = _data[index];
          Object.assign(current, {style: 2});
          mass.setData(_data);
          // let _data = mass.getData();
          // console.log('+++++', _data);
        }

        // console.log('e:::', e);
        // let _style = e.data.style === 0 ? 1 : 0;
        // console.log('_style', _style);
        // e.data.style = _style;
        // marker.setPosition(e.data.lnglat);
        // marker.setLabel({content: e.data.name})
      });

      mass.setMap(this.AMap);

      // console.log("mmmm", mass);
    },
  },
};
</script>