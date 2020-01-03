let _title = `title: {
    show:false,
    text: "我是标题",
    top: '20',
    left: '0',
    textStyle:{
      //color:'#354052',
      fontSize:14,
      fontWeight:'normal'
    }
  }`;
let _legend = `legend: {
    show: true,
    left: "center",
    bottom: '10',
    orient: "horizontal"
  }`;
let _grid = `grid: {
      left: '20',
      right: '40',
      bottom: '60',
      top:'70',
      containLabel : true
  }`;
let _tooltip = `tooltip: {
    trigger: 'axis'
  }`;
let _toolbox = `toolbox:{
    show: true,
    right: 20,
    feature: {
        dataZoom: {
            yAxisIndex: 'none'
        },
        restore: {},
        // magicType: {type: ['line', 'bar']},
        saveAsImage: {
            type: 'jpeg',
            backgroundColor: '#fff'
        }
    }
  }`;
let _color =`color:[]`;
let _common = `${_title},
  ${_legend},
  ${_grid},
  ${_tooltip},
  ${_toolbox}`;

let _xAxis = `{
    type: 'category',
    data: $category,
    axisLabel:{
        fontSize:12
    },
    axisTick:{
      show:false
    },
    axisLine:{
      show:false,
      lineStyle:{
        //color: '#E7E9ED' 
      }
    }
  }`;
let _yAxis = `{
    type: 'value',
    axisTick:{
      show:false
    },
    axisLine:{
      show:false
    },
    splitLine:{
      lineStyle:{
        //color: '#E7E9ED' 
      }
    },
    axisLabel:{
      fontSize:12,
      formatter: function (value, index, cid=$id) {
        if (index == 0) {
          bi.echarts_format_minv = 0;
        }
        if (value != 0 && bi.echarts_format_minv == 0) {
          bi.echarts_format_minv = value;
        }
        return bi.compile.numerFormatter(value, bi.echarts_format_minv, 0, 1);
      }
    }
  }`;
let _setting = null;
eval('_setting = {' + _common + '}');

bi.echarts = {
  line: {
    class: 'echarts',
    icon: "#iconiconfont_bi_line1",
    title: "折线图",
    limit: [[1, 1], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: 'line',
    smooth: false,
    name: String($title),    
    areaStyle:{
      origin:'start',
      opacity:0.1
    }
  }\`)
}`},

//    linearea: {
//      class: 'echarts',
//      icon: "#iconbi-area",
//      title: "折线图",
//      limit: [[1, 2], [1, 99]],
//      setting: _setting,
//      option: `option = {
//    xAxis:${_xAxis},
//    yAxis:${_yAxis},
//    series: $fields(\`{
//      data: $col($title, 'number'),
//      type: "line",
//      smooth: true,
//      areaStyle: {
//        normal: {}
//      },
//      name: String($title)
//    }\`)
//  }`},

//    linearea2: {
//      class: 'echarts',
//      icon: "#iconbi-area-stick1",
//      title: "折线图",
//      limit: [[1, 2], [1, 99]],
//      setting: _setting,
//      option: `option = {
//    xAxis:${_xAxis},
//    yAxis:${_yAxis},
//    series: $fields(\`{
//      data: $col($title, 'number'),
//      type: "line",
//      name: String($title),
//      stack: "stack",
//      smooth: true,
//      areaStyle: {
//        normal: {}
//      },
//    }\`)
//  }`},

  bar1: {
    class: 'echarts',
    icon: "#iconiconfont_bi_barX1",
    title: "柱状图",
    limit: [[1, 1], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: "bar",
    barMaxWidth:30,
    name: String($title)
  }\`)
}`},

//   bar3: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_barY1",
//     title: "柱状图",
//     limit: [[1, 1], [2, 99]],
//     setting: _setting,
//     option: `option = {
//   xAxis:${_yAxis},
//   yAxis:${_xAxis},
//   series: $fields(\`{
//     data: $col($title, 'number'),
//     type: "bar",
//     barMaxWidth:30,
//     name: String($title)
//   }\`)
// }`},

bar2: {
  class: 'echarts',
  icon: "#iconiconfont_bi_bar1",
  title: "堆叠图",
  limit: [[1, 1], [2, 99]],
  setting: _setting,
  option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: "bar",
    stack: "bar2",
    name: String($title)
  }\`)
}`},

  linebar: {
    class: 'echarts',
    icon: "#iconiconfont_bi_lineBar1",
    title: "混合图",
    limit: [[1, 1], [1, 99]],
    axis: 2,
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:[{
    type: 'value',    	
    ...$split($fs1, 5)    	
  },{
    type: 'value',
    axisLabel: {
      formatter: function(value){
        return value.toFixed(0);
      }
    },
    ...$split($fs2, 5)
  }],
  series: $fields(\`{
    data: $col($title, 'number'),
    type: item.chart,
    barMaxWidth:30,
    name: String($title),
    yAxisIndex: item.axis
  }\`)
}`},

//   pie1: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_pie1",
//     title: "饼图",
//     limit: [[1, 1], [2, 99]],
//     setting: {
//       tooltip: {
//         target: 'item'
//       },
//       title: {
//         show:false,
//         text: "我是标题",
//         top: '20',
//         left: '0',
//         textStyle:{
//           //color:'#354052',
//           fontSize:14,
//           fontWeight:'normal'
//         }
//       },
//       legend: {
//         show: true,
//         left: "center",
//         bottom: '20',
//         orient: "horizontal",
//       }
//     },
//     option: `option = {
//   series: {
//     data: $fields(\`{
//       value: Number($one($title)),
//       name: String($title)
//     }\`),
//     center: [
//       '50%', '50%'
//     ],
//     radius: "50%",
//     type: 'pie'
//   }
// }`},

//   pie: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_pie1",
//     title: "饼图",
//     limit: [[1, 1], [1, 1]],
//     setting: {
//       tooltip: {
//         target: 'item'
//       },
//       title: {
//         show:false,
//         text: "我是标题",
//         top: '20',
//         left: '0',
//         textStyle:{
//           //color:'#354052',
//           fontSize:14,
//           fontWeight:'normal'
//         }
//       },
//       legend: {
//         show: true,
//         left: "center",
//         bottom: '20',
//         orient: "horizontal",
//       }
//     },
//     option: `option = {
//   series: $fields(\`{
//     data: $kv(['name',$g0,'string'],['value',$title,'number']),
//     center: [
//       '50%', '50%'
//     ],
//     radius: "50%",
//     type: 'pie',
//     name: String($title)
//   }\`)
// }`},


// pie4: {
//   class: 'echarts',
//   icon: "#iconiconfont_bi_circle1",
//   title: "饼图",
//   limit: [[1, 1], [2, 99]],
//   setting: {
//     tooltip: {
//       target: 'item'
//     },
//     title: {
//       show:false,
//       text: "我是标题",
//       top: '20',
//       left: '0',
//       textStyle:{
//         //color:'#354052',
//         fontSize:14,
//         fontWeight:'normal'
//       }
//     },
//     legend: {
//       show: true,
//       left: "center",
//       bottom: '20',
//       orient: "horizontal",
//     }
//   },
//   option: `option = {
// series: {
//   data: $fields(\`{
//     value: Number($one($title)),
//     name: String($title)
//   }\`),
//   center: [
//     '50%', '50%'
//   ],
//   radius: ['30%', '50%'],
//   type: 'pie'
// }
// }`},

pie3: {
  class: 'echarts',
  icon: "#iconiconfont_bi_circle1",
  title: "饼图",
  limit: [[1, 1], [1, 1]],
  setting: {
    tooltip: {
      target: 'item'
    },
    title: {
      show:false,
      text: "我是标题",
      top: '20',
      left: '0',
      textStyle:{
        //color:'#354052',
        fontSize:14,
        fontWeight:'normal'
      }
    },
    legend: {
      show: true,
      left: "center",
      bottom: '20',
      orient: "horizontal",
    }
  },
  option: `option = {
series: $fields(\`{
  data: $kv(['name',$g0,'string'],['value',$title,'number']),
  center: [
    '50%', '50%'
  ],
  radius: ['30%', '50%'],
  type: 'pie',
  name: String($title)
}\`)
}`},

//   radar1: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_radar1",
//     title: "雷达图",
//     limit: [[1, 1], [1, 99]],
//     setting: {
//       tooltip: {},
//       title: {
//         show:false,
//         text: "我是标题",
//         top: '20',
//         left: '0',
//         textStyle:{
//           //color:'#354052',
//           fontSize:14,
//           fontWeight:'normal'
//         }
//       },
//       legend: {
//         show: true,
//         left: "center",
//         bottom: '20',
//         orient: "horizontal",
//       }
//     },
//     option: `option = {
//   radar: {
//     indicator: $list(\`{
//       name: String(item[$g0]),
//       max: $max($fall)
//     }\`),
//     center: ['50%', '50%'],
//     radius: '50%'
//   },
//   series: [{
//     type: 'radar',
//     symbol: 'circle',
//     label:{
//         formatter: '{a}: {b} : {c}'
//     },
//     symbolSize: 4,
//     data: $fields(\`{
// 			name: String($title),
// 			value: $col($title,'number')
// 		}\`)
//   }]
// }`},

//   scatter: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_scatter1",
//     title: "散点图",
//     limit: [[0, 3], [2, 2]],
//     setting: {
//       tooltip: {},
//       title: {
//         show:false,
//         text: "我是标题",
//         top: '20',
//         left: '0',
//         textStyle:{
//           //color:'#354052',
//           fontSize:14,
//           fontWeight:'normal'
//         }
//       },
//       legend: {
//         show: true,
//         left: "center",
//         bottom: '20',
//         orient: "horizontal",
//       }
//     },
//     option: `option = {
//   xAxis: {},
//   yAxis: {},
//   visualMap: [{
//     dimension: 0,
//     min: parseInt($min($f0)),
//     max: parseInt($max($f0)),
//     show: false,
//     inRange: {
//       symbolSize: [10, 70]
//     }
//   }, {
//     dimension: 1,
//     min: parseInt($min($f1)),
//     max: parseInt($max($f1)),
//     show: false,
//     itemWidth: 30,
//     itemHeight: 120,
//     inRange: {
//       colorLightness: [1, 0.5]
//     }
//   }],
//   series: {
//     name: $legend,
//     data: $gp([$f0,'number'], [$f1,'number']),
//     type: 'scatter'
//   }
// }`},

//   map: {
//     class: 'echarts',
//     icon: "#iconiconfont_bi_map1",
//     title: "省、市气泡图",
//     limit: [[1, 1], [1, 1]],
//     setting: {
//       title: {
//         show:false,
//         text: "我是标题",
//         top: '20',
//         left: '0',
//         textStyle:{
//           color:'#354052',
//           fontSize:14,
//           fontWeight:'normal'
//         }
//       },
//       tooltip : {
//         trigger: 'item'
//       }, 
//       geo: {
//         map: 'china',
//         // left: 0, top: 0, right: 0, bottom: 0,
//         label: {
//           emphasis: {
//             show: false
//           }
//         },
//         itemStyle: {
//           normal: {
//             areaColor: '#323c48',
//             borderColor: '#111'
//           },
//           emphasis: {
//             areaColor: '#2a333d'
//           }
//         }
//       },
//     },
//     option: `var _one = $max($f0)/5;
// option = {
//   series: [{
//       name: $f0,
//       type: 'scatter',
//       coordinateSystem: 'geo',
//       data: $map(),
//       itemStyle: {
//           normal: {
//               color: '#ddb926'
//           }
//       },
//       label:{
//             formatter: '{a}: {b} : {c} '
//       },
//       symbolSize: function (val) {
//         var sval = Math.floor(parseFloat(val[2])/_one);
//         if(sval == 0) { sval = 1 }
//         return sval * 8;
//       }
//     }]
// }`},

// map1:{
//     class: 'echarts',
//     icon: "#iconmap3d1",
//     title: "省、市柱状图",
//     limit: [[1, 1], [1, 1]],
//     setting:{
//         geo3D: {
//             map: 'china',
//             roam: true,
//             itemStyle: {
//                 areaColor: '#a37d4a ',
//                 color:'#a37d4a ',
//                 opacity: 1,
//                 borderWidth: 0.4,
//                 borderColor: '#000'
//             },
//             label: {
//                 show: false,
//                 textStyle: {
//                     color: '#000', //地图初始化区域字体颜色
//                     fontSize: 8,
//                     opacity: 1,
//                     backgroundColor: '#a37d4a'
//                 }
//             },
//             emphasis: { //当鼠标放上去  地区区域是否显示名称
//                 label: {
//                     show: true,
//                     textStyle: {
//                         color: '#fff',
//                         fontSize: 3,
//                         backgroundColor: 'rgba(0,23,11,0)'
//                     }
//                 },
//                 itemStyle:{
//                     areaColor: '#a37d4a ',
//                     color:'#a37d4a ',
//                     opacity: 0.9,
//                 }
//             },
//             light: { //光照阴影
//                 main: {
//                     color: '#fff', //光照颜色
//                     intensity: 1.2, //光照强度
//                     shadow: false, //是否显示阴影
//                     alpha:55,
//                     beta:10
    
//                 },
//                 ambient: {
//                     intensity: 0.3
//                 }
//             }
//         }
//     },
//     option:`option = {
//             visualMap: [{
//                 type: 'continuous',
//                 seriesIndex: 0,
//                 text: ['bar3D'],
//                 calculable: true,
//                 min: parseInt($min($fall)),
//                 max: parseInt($max($fall)),
//                 inRange: {
//                     color:['#91c660', '#7789a8', '#ed713b'] 
//                 },
//                 show:false
//             }],
//             series: [{
//                 name:  $f0,
//                 type: "bar3D",
//                 coordinateSystem: 'geo3D',
//                 barSize: 1, //柱子粗细
//                 shading: 'lambert',
//                 minHeight:2,
//                 opacity: 1,
//                 label: {
//                     show: false,
//                     formatter: '{b}'
//                 },
//                 emphasis:{
//                     label: {
//                         show: false,
//                         formatter: '{b}'
//                     }
//                 },
//                 bevelSize:0.3,
//                 data: $map(),
//             }]
//     }`
// },

// map2:{
//     class: 'echarts',
//     icon: "#iconblockMap1",
//     title: "省份色块图",
//     limit: [[1, 1], [1, 1]],
//     setting:{
//         tooltip: {
//             trigger: 'item'
//         }
//     },
//     option:`option = {
//             visualMap: [{
//                 left: 'left',
//                 top: 'bottom',
//                 min: parseInt($min($fall)),
//                 max: parseInt($max($fall)),
//                 show:false
//             }],
//             series: [{
//                 name:  $f0,
//                 type: 'map',
//                 mapType: 'china',
//                 roam: true,
//                 label: {
//                     normal: {
//                         show: true
//                     },
//                     emphasis: {
//                         show: true
//                     }
//                 },
//                 data:  $list(\`{
//                       value: $rowval()[0],
//                       name: String(item[$g0])
//                 }\`)
//             }]
//     }`
// },

// wordCloud: {
//   class: 'echarts',
//   icon: "#iconword-frequency1",
//   title: "词频",
//   limit: [[1, 1], [1, 1]],
//   setting: {
//     title: {
//     show:false,
//       text: "我是标题",
//       top: '40',
//       left: '40'
//     }
//   },
//   option: `option = {
//     series:{
//         type: 'wordCloud',
//         sizeRange: [16, 50],
//         rotationRange: [-90, 90],
//         rotationStep: 45,
//         gridSize: 25,
//         textStyle: {
//             normal: {
//                 color: function () {
//                     return 'rgb(' + [
//                         Math.round(Math.random() * 160),
//                         Math.round(Math.random() * 160),
//                         Math.round(Math.random() * 160)
//                     ].join(',') + ')';
//                 }
//             }
//         },
//         shape: 'pentagon',
//         data: $kv(['name',$g0,'string'], ['value',$f0,'number'])
//     }
// }`}
};