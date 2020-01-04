let _title = `title: {
    text: "我是标题",
    top: '40',
    left: '40'
  }`;
let _legend = `legend: {
    show: true,
    left: "center",
    bottom: '40',
    orient: "horizontal",
  }`;
let _grid = `grid: {
    left: '70',
    top: '100',
    right: '70',
    bottom: '100',
    containLabel: true
  }`;
let _tooltip = `tooltip: {
    trigger: 'axis'
  }`;
let _toolbox = `toolbox:{
  }`;
let _color =`color:[]`;
let _common = `${_title},
  ${_legend},
  ${_grid},
  ${_tooltip},
  ${_color},
  ${_toolbox}`;
  
let _xAxis = `{
    type: 'category',
    data: $category
  }`;
let _yAxis = `{
    type: 'value'
  }`;
let _chartAttr = { name: "echartsAttr", file: "echarts" };
let _chartItem = { name: "echartsChart", file: "echarts" };
let _setting = null;
eval('_setting = {' + _common + '}');

export default {
  table: {
    class: 'echarts,hcharts',
    icon: "#icon-bi-table",
    title: "表格",
    limit: [[0, 99], [0, 99]],
    option: {
    },
    setting: {
      stripe: false,
      border: true,
      sortable: true,
      merge: false,
      "default-sort": {},
      fixed: {},
      "show-summary": false,
      "show-header": true,
      index: false,
      "header-row-style": {},
      "header-cell-style": {},
      "row-click": "",
      "span-method": ""
    }
  },
  indexcard: {
    class: 'echarts,hcharts',
    icon: "#icon-bi-indexcard",
    title: "指标卡",
    limit: [[0, 0], [0, 2]],
    option: {
      style:{
        "color":"rgba(255, 255, 255, 0.7)"
       }
    },
    setting: {
      color:['rgba(255, 255, 255, 0.7)','rgba(255, 255, 255, 0.7)']
    }
  },
  line: {
    class: 'echarts',
    attr: { name: "echartslineAttr", file: "echarts/line" },
    chart: _chartItem,
    icon: "#icon-bi-line1",
    title: "折线图",
    limit: [[1, 2], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: 'line',
    smooth: true,
    name: String($title)
  }\`)
}`},

  linearea: {
    class: 'echarts',
    attr: { name: "echartslineareaAttr", file: "echarts/linearea" },
    chart: _chartItem,
    icon: "#icon-bi-area",
    title: "折线图",
    limit: [[1, 2], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: "line",
    smooth: true,
    areaStyle: {
      normal: {}
    },
    name: String($title)
  }\`)
}`},

  linearea2: {
    class: 'echarts',
    attr: { name: "echartslinearea2Attr", file: "echarts/linearea2" },
    chart: _chartItem,
    icon: "#icon-bi-area-stick",
    title: "折线图",
    limit: [[1, 2], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: "line",
    name: String($title),
    stack: "stack",
    smooth: true,
    areaStyle: {
      normal: {}
    },
  }\`)
}`},

  bar1: {
    class: 'echarts',
    attr: { name: "echartsbar1Attr", file: "echarts/bar1" },
    chart: _chartItem,
    icon: "#icon-bi-bar1",
    title: "柱状图",
    limit: [[1, 2], [1, 99]],
    setting: _setting,
    option: `option = {
  xAxis:${_xAxis},
  yAxis:${_yAxis},
  series: $fields(\`{
    data: $col($title, 'number'),
    type: "bar",
    name: String($title)
  }\`)
}`},

  bar2: {
    class: 'echarts',
    attr: { name: "echartsbar2Attr", file: "echarts/bar2" },
    chart: _chartItem,
    icon: "#icon-bi-bar1-stack",
    title: "柱状图",
    limit: [[1, 2], [2, 99]],
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
    attr: { name: "echartslinebarAttr", file: "echarts/linebar" },
    chart: _chartItem,
    icon: "#icon-bi-linebar",
    title: "混合图",
    limit: [[0, 2], [1, 99]],
    axis: 2,
    types: [
      {'class': '#icon-bi-line1', 'type': 'line'}, 
      {'class': '#icon-bi-bar1', 'type': 'bar'}, 
    ],
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
    name: String($title),
    yAxisIndex: item.axis
  }\`)
}`},

  pie1: {
    class: 'echarts',
    attr: { name: "echartspieAttr", file: "echarts/pie" },
    chart: _chartItem,
    icon: "#icon-bi-pie",
    title: "饼图",
    limit: [[1, 1], [2, 99]],
    setting: {
      tooltip: {
        target: 'item'
      },
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      legend: {
        show: true,
        left: "center",
        bottom: '40',
        orient: "horizontal",
      }
    },
    option: `option = {
  series: {
    data: $fields(\`{
      value: Number($one($title)),
      name: String($title)
    }\`),
    center: [
      '50%', '50%'
    ],
    radius: "75%",
    type: 'pie'
  }
}`},

  pie: {
    class: 'echarts',
    attr: { name: "echartspieAttr", file: "echarts/pie" },
    chart: _chartItem,
    icon: "#icon-bi-pie",
    title: "饼图",
    limit: [[1, 1], [1, 1]],
    setting: {
      tooltip: {
        target: 'item'
      },
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      legend: {
        show: true,
        left: "center",
        bottom: '40',
        orient: "horizontal",
      }
    },
    option: `option = {
  series: $fields(\`{
    data: $kv(['name',$g0,'string'],['value',$title,'number']),
    center: [
      '50%', '50%'
    ],
    radius: "75%",
    type: 'pie',
    name: String($title)
  }\`)
}`},

  radar1: {
    class: 'echarts',
    attr: { name: "echartsradar1Attr", file: "echarts/radar1" },
    chart: _chartItem,
    icon: "#icon-bi-radar",
    title: "雷达图",
    limit: [[1, 1], [1, 99]],
    setting: {
      tooltip: {},
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      legend: {
        show: true,
        left: "center",
        bottom: '40',
        orient: "horizontal",
      }
    },
    option: `option = {
  radar: {
    indicator: $list(\`{
      name: String(item[$g0]),
      max: $max($fall)
    }\`),
    center: ['50%', '50%'],
    radius: '75%',
  },
  series: [{
    type: 'radar',
    symbol: 'circle',
    symbolSize: 4,
    data: $fields(\`{
			name: String($title),
			value: $col($title,'number')
		}\`)
  }]
}`},

  radar: {
    class: 'echarts',
    attr: { name: "echartsradarAttr", file: "echarts/radar" },
    chart: _chartItem,
    icon: "#icon-bi-radar",
    title: "雷达图",
    limit: [[1, 1], [3, 99]],
    setting: {
      tooltip: {},
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      legend: {
        show: true,
        left: "center",
        bottom: '40',
        orient: "horizontal",
      }
    },
    option: `option = {
  radar: {
    indicator: $fields(\`{
      name: String($title),
      max: $max($fall)
    }\`),
    center: ['50%', '50%'],
    radius: '75%',
  },
  series: [{
    type: 'radar',
    symbol: 'circle',
    symbolSize: 4,
    data: $list(\`{
      value: $rowval(),
      name: String(item[$g0])
    }\`)
  }]
}`},

  scatter: {
    class: 'echarts',
    attr: { name: "echartsscatterAttr", file: "echarts/scatter" },
    chart: _chartItem,
    icon: "#icon-bi-scatter",
    title: "散点图",
    limit: [[0, 3], [2, 2]],
    setting: {
      tooltip: {},
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      legend: {
        show: true,
        left: "center",
        bottom: '40',
        orient: "horizontal",
      }
    },
    option: `option = {
  xAxis: {},
  yAxis: {},
  visualMap: [{
    dimension: 0,
    min: parseInt($min($f0)),
    max: parseInt($max($f0)),
    show: false,
    inRange: {
      symbolSize: [10, 70]
    }
  }, {
    dimension: 1,
    min: parseInt($min($f1)),
    max: parseInt($max($f1)),
    show: false,
    itemWidth: 30,
    itemHeight: 120,
    inRange: {
      colorLightness: [1, 0.5]
    }
  }],
  series: {
    data: $gp([$f0,'number'], [$f1,'number']),
    type: 'scatter'
  }
}`},

  map: {
    class: 'echarts',
    attr: { name: "echartsscatterAttr", file: "echarts/map" },
    chart: _chartItem,
    icon: "#icon-bi-map",
    title: "汽泡图",
    limit: [[1, 1], [1, 1]],
    setting: {
      title: {
        text: "我是标题",
        top: '40',
        left: '40'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      geo: {
        map: 'china',
        left: 0, top: 0, right: 0, bottom: 0,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
    },
    option: `var _one = $max($f0)/5;
option = {
  series: [{
      name: $g0,
      type: 'scatter',
      coordinateSystem: 'geo',
      data: $map(),
      itemStyle: {
          normal: {
              color: '#ddb926'
          }
      },
      symbolSize: function (val) {
        var sval = Math.floor(parseFloat(val[2])/_one);
        return sval * 8;
      }
    }]
}`},
liquidFill: {
  class: 'echarts',
  attr: { name: "echartspieAttr", file: "echarts/liquidFill" },
  chart: _chartItem,
  icon: "#icon-bi-liquidFill",
  title: "水球图(数值是0-1之间的小数)",
  limit: [[0, 0], [1, 99]],
  setting: {
    title: {
      text: "我是标题",
      top: '40',
      left: '40'
    }
  },
  option: `option = {
    series: $fields(\`{
      type: 'liquidFill',
      center: ['50%', '50%'],
      data: $col($title, 'number'),
    }\`)
}`}
};