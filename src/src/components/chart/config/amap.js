export default {
  amapbubble: {
    class: 'amap',
    attr: { name: "amapbubbleAttr", file: "amap/bubble" },
    icon: "#icon-bi-map",
    title: '高德汽泡图',
    limit: [[0, 3], [3, 99]],
    setting: {
      zoom: 5,
      url: '',
      target: '',
      center: "113.198632,23.12537",
      scrollWheel: false,
      plugin: [{
        pName: "ToolBar",
        position: "RT",
        offset: [40, 30]
      }],
    },
    option: `option = {
  msg: _this.fields.slice(2),
  data: $list(\`{
    lng: bi.formatType(item[$f0], 2),
    lat: bi.formatType(item[$f1], 2),
    val: bi.formatType(item[$f2], 2),
    data: item
  }\`)
}`
  },
  amapheat: {
    class: 'amap',
    attr: { name: "amapheatAttr", file: "amap/heat" },
    icon: "#icon-map-heat",
    title: '高德热力图',
    limit: [[0, 0], [3, 3]],
    setting: {
      zoom: 11,
      center: "116.418261,39.921984",
      scrollWheel: false,
      plugin: [{
        pName: "ToolBar",
        position: "RT",
        offset: [40, 30]
      }],
      heatmap: {
        radius: 25,
        opacity: [0, 0.8]
      },
    },
    option: `option = {
  data: $list(\`{
    lng: bi.formatType(item[$f0], 2),
    lat: bi.formatType(item[$f1], 2),
    count: item[$f2]
  }\`)
}`},

  amapblock: {
    class: 'amap',
    attr: { name: "amapblockAttr", file: "amap/block" },
    icon: "#icon-map-block",
    title: '高德区块图',
    limit: [[0, 0], [2, 99]],
    setting: {
      zoom: 11,
      url: '',
      target: '',
      center: "113.198632,23.12537",
      scrollWheel: false,
      plugin: [{
        pName: "ToolBar",
        position: "RT",
        offset: [40, 30]
      }]
    },
    option: `option = {
  msg: _this.fields.slice(1),
  data: $list(\`{
    path: String(item[$f0]),
    data: item
  }\`)
}`},

  amappoint: {
    class: 'amap',
    attr: { name: "amappointAttr", file: "amap/point" },
    icon: "#icon-map-point",
    title: '高德标点图',
    limit: [[0, 0], [2, 99]],
    setting: {
      zoom: 13,
      url: '',
      target: '',
      center: "113.198632,23.12537",
      scrollWheel: false,
      plugin: [{
        pName: "ToolBar",
        position: "RT",
        offset: [40, 30]
      }]
    },
    option: `option = {
  msg: _this.fields.slice(3),
  data: $list(\`{
    lng: bi.formatType(item[$f0], 2),
    lat: bi.formatType(item[$f1], 2),
    data: item
  }\`)
}`},
};