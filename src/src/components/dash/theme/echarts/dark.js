(function (root, factory) {
  factory(exports, require('echarts'));
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && bi.error && bi.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('dark', {
    "color": bi.dash.themes.dark.colors,
    "backgroundColor": bi.dash.themes.dark.backgroundColor,
    "textStyle": bi.dash.themes.dark.textStyle,
    "title": {
      "textStyle": {
        "color": "#ffffff"
      },
      "subtextStyle": {
        "color": "#aaaaaa"
      }
    },
    "line": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": 2
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "itemStyle": {
        "normal": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        },
        "emphasis": {
          "barBorderWidth": 0,
          "barBorderColor": "#ccc"
        }
      }
    },
    "pie": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "scatter": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "boxplot": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "parallel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "sankey": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "funnel": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "gauge": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      }
    },
    "candlestick": {
      "itemStyle": {
        "normal": {
          "color": "#c23531",
          "color0": "#314656",
          "borderColor": "#c23531",
          "borderColor0": "#314656",
          "borderWidth": 1
        }
      }
    },
    "graph": {
      "itemStyle": {
        "normal": {
          "borderWidth": 0,
          "borderColor": "#ccc"
        }
      },
      "lineStyle": {
        "normal": {
          "width": 1,
          "color": "#aaaaaa"
        }
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        "#645fe7",
        "#f39800",
        "#2da8fb",
        "#fff100",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ],
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eeeeee"
          }
        }
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#e7e9ed"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#adafb2"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#c5d0de"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#adafb2"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#c5d0de"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#adafb2"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#adafb2"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999999"
        },
        "emphasis": {
          "borderColor": "#666666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#ffffff"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#cccccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#cccccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#293c55",
        "width": 1
      },
      "itemStyle": {
        "normal": {
          "color": "#293c55",
          "borderWidth": 1
        },
        "emphasis": {
          "color": "#a9334c"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#e43c59",
        "borderColor": "rgba(194,53,49,0.5)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#293c55"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#293c55"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#645fe7",
        "#f39800",
        "#2da8fb"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333333"
      }
    },
    "markPoint": {
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eeeeee"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#eeeeee"
          }
        }
      }
    }
  });
}));
