let _title = {
  text: "我是标题",
  align: 'left',
  margin: 25,
  y: 25
};
let _exporting = {
  enabled: false
};
let _credits = {
  enabled: false
};
let _yAxis = {
  title: null
};
let _color =[];
let _setting = {
  title: _title,
  exporting: _exporting,
  credits: _credits,
  yAxis: _yAxis,
  colors:_color
};

let _xAxis = `xAxis: {
    categories: $category
  }`;

export default {
  hline: {
    class: 'hcharts',
    attr: { name: "hlineAttr", file: "hcharts/line" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-line1",
    title: "折线图",
    limit: [[0, 3], [1, 99]],
    setting: {
      chart: { type: 'line' },
      ..._setting
    },
    option: `option = {
  ${_xAxis},
  series: $fields(\`{
    data: $col($title,'number'),
    name: $title
  }\`)
}`},

hcolumn: {
  class: 'hcharts',
  attr: { name: "hcolumnAttr", file: "hcharts/column" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-bi-bar1",
  title: "柱状图",
  limit: [[0, 3], [1, 99]],
  setting: {
    chart: { 
      type: 'column',
      options3d: {
        enabled: false,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    ..._setting,
    plotOptions: {
      column: {
        depth: 25
      }
    }
  },
  option: `option = {
  ${_xAxis},
  series: $fields(\`{
    data: $col($title,'number'),
    name: $title
  }\`)
}`},

  harea: {
    class: 'hcharts',
    attr: { name: "hareaAttr", file: "hcharts/area" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-area",
    title: "面积图",
    limit: [[0, 3], [1, 99]],
    setting: {
      chart: { type: 'area' },
      ..._setting
    },
    option: `option = {
  ${_xAxis},
  series: $fields(\`{
    data: $col($title,'number'),
    name: $title
  }\`)
}`},

hlinebar: {
  class: 'hcharts',
  attr: { name: "hlinebarAttr", file: "hcharts/linebar" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-bi-linebar",
  title: "混合图",
  limit: [[0, 2], [1, 99]],
  axis: 2,
  types: [
    {'class': '#icon-bi-line1', 'type': 'line'}, 
    {'class': '#icon-bi-line1', 'type': 'spline'}, 
    {'class': '#icon-bi-bar1', 'type': 'column'}, 
    {'class': '#icon-bi-area', 'type': 'area'}
  ],
  setting: {
    chart: { type: 'column' },
    ..._setting
  },
  option: `option = {
  ${_xAxis},
  yAxis:[{
    type: 'value',
    title: null
  },{
    type: 'value',
    title: null,
    opposite: true
  }],
  series: $fields(\`{
    data: $col($title, 'number'),
    type: item.chart,
    yAxis: item.axis,
    name: String($title)
  }\`)
}`},

  hbarvs: {
    class: 'hcharts',
    attr: { name: "hbarvsAttr", file: "hcharts/barvs" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-bar3",
    title: "对比图",
    limit: [[0, 3], [2, 2]],
    setting: {
      chart: { type: 'bar' },
      ..._setting,
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
    },
    option: `let _series = $fields(\`{
  data: $col($title,'number'),
  name: $title
}\`);
_series[0].data = _series[0].data.map(item => {return item*-1});

option = {
  xAxis: [{
    categories: $category,
    reversed: false,
    labels: {
      step: 1
    }
  }, {
    opposite: true,
    reversed: false,
    categories: $category,
    linkedTo: 0,
    labels: {
      step: 1
    }
  }],
  series: _series
}`},

hcolumnrange: {
  class: 'hcharts',
  attr: { name: "hcolumnrangeAttr", file: "hcharts/columnrange" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-bi-bar5",
  title: "柱形范围图",
  limit: [[0, 3], [2, 2]],
  setting: {
    chart: { type: 'columnrange', inverted: true },
    ..._setting,
    legend: {enabled: false},
    plotOptions:{series:{dataLabels:{enabled:true}}},
    tooltip: {
      shared: false,
      headerFormat: '',
      pointFormat: '范围：<b>{point.low}</b> - <b>{point.high}</b><br/>',
      footerFormat: '',
      valueDecimals: 0
    }
  },
  option: `option = {
  ${_xAxis},
  series: [{
    data: $gp([$f0,'number'], [$f1,'number'])
  }]
}`},

  hpie: {
    class: 'hcharts',
    attr: { name: "hpieAttr", file: "hcharts/pie" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-pie",
    title: "饼图",
    limit: [[1, 1], [2, 99]],
    setting: {
      chart: { 
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        } 
      },
      plotOptions: {
        pie: {
          depth: 45
        }
      },
      ..._setting
    },
    option: `option = {
  series: [{
    data: $fields(\`{
      y: $one($title,'number'),
      name: $title
    }\`),
    name: $g0
  }]
}`},

  hpie1: {
    class: 'hcharts',
    attr: { name: "hpie1Attr", file: "hcharts/pie" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-pie",
    title: "饼图",
    limit: [[1, 1], [1, 1]],
    setting: {
      chart: { 
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        } 
      },
      plotOptions: {
        pie: {
          depth: 45
        }
      },
      ..._setting
    },
    option: `option = {
  series: $fields(\`{
    data: $kv(['name',$g0,'string'],['y',$title,'number']),
    name: $title
  }\`)
}`},

  hscatter: {
    class: 'hcharts',
    attr: { name: "hscatterAttr", file: "hcharts/scatter" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-scatter",
    title: "散点图",
    limit: [[0, 3], [2, 2]],
    setting: {
      chart: { type: 'scatter' },
      legend: {enabled: false},
      ..._setting,
      tooltip: {
        headerFormat: '',
        pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>',
        footerFormat: '',
        valueDecimals: 0
      },
    },
    option: `option = {
  series: [{
    data: $gp([$f0,'number'], [$f1,'number'])
  }]
}`},

hscatter3d: {
  class: 'hcharts',
  attr: { name: "hscatter3dAttr", file: "hcharts/scatter3d" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-bi-scatter",
  title: "3D散点图",
  limit: [[0, 3], [3, 3]],
  setting: {
    chart: { 
      type: 'scatter',
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 30,
        depth: 250,
        viewDistance: 5,
        frame: {
          bottom : { size: 1, color: 'rgba(0,0,0,0.02)' },
          back: { size: 1, color: 'rgba(0,0,0,0.04)' },
          side: { size: 1, color: 'rgba(0,0,0,0.06)' }
        }
      }
    },
    tooltip: {
      headerFormat: '',
      pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>',
      footerFormat: '',
      valueDecimals: 0
    },
    plotOptions: {
      scatter: {
        width: 10,
        height: 10,
        depth: 10
      }
    },
    legend: {enabled: false},
    ..._setting
  },
  option: `let _max = Math.max($max($f0),$max($f1),$max($f2));
option = {
  yAxis: {
    min: 0,
    max: _max,
    title: null
  },
  xAxis: {
    min: 0,
    max: _max,
    gridLineWidth: 1
  },
  zAxis: {
    min: 0,
    max: _max
  },
  series: [{
    colorByPoint: true,
    data: $gp([$f0,'number'], [$f1,'number'], [$f2,'number'])
  }]
}`},

  hbubble: {
    class: 'hcharts',
    attr: { name: "hbubbleAttr", file: "hcharts/bubble" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-ic_bubble_chart",
    title: "汽泡图",
    limit: [[0, 3], [3, 3]],
    setting: {
      chart: { type: 'bubble' },
      legend: {enabled: false},
      ..._setting,
      tooltip: {
        headerFormat: '',
        pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>size: <b>{point.z}</b><br/>',
        footerFormat: '',
        valueDecimals: 0
      },
      plotOptions: {
        bubble: {
          marker: {
            fillColor: {
              radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
              stops: [
                  [0, 'rgba(255,255,255,0.5)'],
                  [1, 'rgba(124,181,236,0.5)']
              ]
            }
          }
        }
      }
    },
    option: `option = {
  series: [{
    data: $gp([$f0,'number'],[$f1,'number'],[$f2,'number'])
  }]
}`},

  hradar: {
    class: 'hcharts',
    attr: { name: "hradarAttr", file: "hcharts/bubble" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-radar",
    title: "雷达图",
    limit: [[1, 1], [1, 5]],
    setting: {
      chart: { type: 'line', polar: true },
      pane: { size: '80%' },
      title: _title,
      exporting: _exporting,
      credits: _credits,
      xAxis: {
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      }
    },
    option: `option = {
  ${_xAxis},
  series: $fields(\`{
    data: $col($title,'number'),
    name: $title,
    pointPlacement: 'on'
  }\`)
}`},

  hradar1: {
    class: 'hcharts',
    attr: { name: "hradar1Attr", file: "hcharts/bubble" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-bi-radar",
    title: "雷达图",
    limit: [[0, 1], [3, 99]],
    setting: {
      chart: { type: 'line', polar: true },
      pane: { size: '80%' },
      title: _title,
      exporting: _exporting,
      credits: _credits,
      xAxis: {
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
      }
    },
    option: `option = {
  ${_xAxis},
  series: $list(\`{
    name: String(item[$g0]),
    data: $rowval(),
    pointPlacement: 'on'
  }\`)
}`},

  hfunnel: {
    class: 'hcharts',
    attr: { name: "hfunnelAttr", file: "hcharts/funnel" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-loudoutu",
    title: "漏斗图",
    limit: [[1, 1], [1, 1]],
    setting: {
      chart: { type: 'funnel' },
      title: _title,
      exporting: _exporting,
      credits: _credits,
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none',
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            color: 'black',
            softConnector: true
          }
        },
        neckWidth: '30%',
        neckHeight: '25%'
      }
    },
    option: `option = {
  series: [{
    name: _this.fields[0].title,
    data: $gp([$g0,'string'],[$f0,'number'])
  }]
}`},

  hpyramid: {
    class: 'hcharts',
    attr: { name: "hpyramidAttr", file: "hcharts/pyramid" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-pyramid",
    title: "金字塔图",
    limit: [[1, 1], [1, 1]],
    setting: {
      chart: { type: 'pyramid' },
      title: _title,
      exporting: _exporting,
      credits: _credits,
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            color: 'black',
            softConnector: true
          }
        }
      }
    },
    option: `option = {
  series: [{
    name: _this.fields[0].title,
    data: $gp([$g0,'number'],[$f0,'number'])
  }]
}`},

htreemap: {
  class: 'hcharts',
  attr: { name: "htreemapAttr", file: "hcharts/treemap" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-tree",
  title: "矩形树图",
  limit: [[0, 0], [4, 4]],
  setting: {
    chart: { type: 'treemap' },
    title: _title,
    exporting: _exporting,
    credits: _credits
  },
  option: `let _data = $kv(['id',$f0,1],['parent',$f1,1],['name',$f2,1],['value',$f3,2]);
_data.forEach(item => {
  if (item.parent == '0') {
    delete item.parent;
  }
});
option = {
  series: [{
    type: "treemap",
    layoutAlgorithm: 'stripes',
    alternateStartingDirection: true,
    levels: [{
      level: 1,
      layoutAlgorithm: 'sliceAndDice',
      dataLabels: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top'
      }
    }],
    data: _data
  }]
}`},

  hwordcloud: {
    class: 'hcharts',
    attr: { name: "hwordcloudAttr", file: "hcharts/wordcloud" },
    chart: { name: "hitemcharts", file: "hcharts" },
    icon: "#icon-chartwordcloud",
    title: "词云图",
    limit: [[1, 1], [1, 1]],
    setting: {
      chart: { type: 'wordcloud' },
      title: _title,
      exporting: _exporting,
      credits: _credits
    },
    option: `option = {
  series: [{
    name: '词频',
    data: $kv(['name',$g0,'string'],['weight',$f0,'number'])
  }]
}`},
hsankey: {
  class: 'hcharts',
  attr: { name: "hsankey", file: "hcharts/sankey" },
  chart: { name: "hitemcharts", file: "hcharts" },
  icon: "#icon-bi-sankey",
  title: "桑基图",
  limit: [[2, 2], [1, 1]],
  setting: {
    chart: { type: 'sankey' },
    title: _title,
    tooltip:{enabled:false},
    exporting: _exporting
  },
  option: `option = {
series: [{
  keys: ['from', 'to', 'weight'],
  data:$gp([$g0,'string'],[$g1,'string'],[$f0,'number'])
}]
}`}
};