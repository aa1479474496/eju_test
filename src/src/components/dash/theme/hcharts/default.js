/*
 Highcharts JS v6.0.7 (2018-02-16)

 (c) 2009-2017 Highsoft AS

 License: www.hcharts.com/license
*/
bi.dash.highthemes.default = {
  colors: bi.dash.themes.default.colors,
  chart: {
    backgroundColor: bi.dash.themes.default.backgroundColor,
    style: {"fontFamily":"宋体, 微软雅黑, Arial, Helvetica, sans-serif","fontSize":"12px","color":"#fff"}
  },
  title: {
    style: {
      color: "#fff",
      textTransform: "uppercase",
      fontSize: "20px"
    }
  },
  subtitle: {
    style: {
      color: "#fff",
      textTransform: "uppercase"
    }
  },
  xAxis: {
    gridLineColor: "#707073",
    labels: {
      style: {
        color: "#fff"
      }
    },
    lineColor: "#707073",
    minorGridLineColor: "#505053",
    tickColor: "#707073",
    title: {
      style: {
        color: "#A0A0A3"
      }
    }
  },
  yAxis: {
    gridLineColor: "#707073",
    labels: {
      style: {
        color: "#fff"
      }
    },
    lineColor: "#707073",
    minorGridLineColor: "#505053",
    tickColor: "#707073",
    tickWidth: 1,
    title: {
      style: {
        color: "#A0A0A3"
      }
    }
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    style: {
      color: "#F0F0F0"
    },
    borderWidth: 0,
    shared: true,
    useHTML: true,
    headerFormat: '<table><tr><td colspan="2" align="center"><b>{point.key}</b></td></tr>',
    pointFormat: '<tr><td style="color: {series.color};text-align: right"><b>{series.name}:</b> </td>' +
    '<td><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: "#B0B0B3"
      },
      marker: {
        lineColor: "#333"
      }
    },
    boxplot: {
      fillColor: "#505053"
    },
    candlestick: {
      lineColor: "white"
    },
    errorbar: {
      color: "white"
    }
  },
  legend: {
    itemStyle: {
      color: "#fff"
    },
    itemHoverStyle: {
      color: "#FFF"
    },
    itemHiddenStyle: {
      color: "#606063"
    }
  },
  credits: {
    style: {
      color: "#666"
    }
  },
  labels: {
    style: {
      color: "#707073"
    }
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: "#F0F0F3"
    },
    activeDataLabelStyle: {
      color: "#F0F0F3"
    }
  },
  navigation: {
    buttonOptions: {
      symbolStroke: "#DDDDDD",
      theme: {
        fill: "#505053"
      }
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: "#505053",
      stroke: "#000000",
      style: {
        color: "#CCC"
      },
      states: {
        hover: {
          fill: "#707073",
          stroke: "#000000",
          style: {
            color: "white"
          }
        },
        select: {
          fill: "#000003",
          stroke: "#000000",
          style: {
            color: "white"
          }
        }
      }
    },
    inputBoxBorderColor: "#505053",
    inputStyle: {
      backgroundColor: "#333",
      color: "silver"
    },
    labelStyle: {
      color: "silver"
    }
  },
  navigator: {
    handles: {
      backgroundColor: "#666",
      borderColor: "#AAA"
    },
    outlineColor: "#CCC",
    maskFill: "rgba(255,255,255,0.1)",
    series: {
      color: "#7798BF",
      lineColor: "#A6C7ED"
    },
    xAxis: {
      gridLineColor: "#505053"
    }
  },
  scrollbar: {
    barBackgroundColor: "#808083",
    barBorderColor: "#808083",
    buttonArrowColor: "#CCC",
    buttonBackgroundColor: "#606063",
    buttonBorderColor: "#606063",
    rifleColor: "#FFF",
    trackBackgroundColor: "#404043",
    trackBorderColor: "#404043"
  },
  legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
  background2: "#505053",
  dataLabelsColor: "#B0B0B3",
  textColor: "#C0C0C0",
  contrastTextColor: "#F0F0F3",
  maskColor: "rgba(255,255,255,0.3)"
}