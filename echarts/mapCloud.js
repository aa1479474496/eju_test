
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        myChart: null,
        mapChart: null,
        hotWord: null
    },
    mounted() {
        this.$nextTick(function () {
            this.myChart = echarts.init(document.getElementById('main'));
            this.mapChart = echarts.init(document.getElementById('mapMain'));
            this.hotWord = echarts.init(document.getElementById('hotWord'));
            this.mapChartInit();
            this.echartsInit([5, 20, 36, 10, 10, 20]);
            this.echartsAnimate();
            this.hotWordChartInit();
        });
    },
    methods: {
        echartsInit(data) {
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: data
                }]
            };
            this.myChart.setOption(option);
        },


        createMapSeries() {
            let data = [
                { name: "北京", value: '限购', coordinate: [116.46, 39.92] },
                { name: "广州", value: '限贷' },
                { name: "深圳", value: '首套房' },
                { name: "成都", value: '贷款' },
                { name: "上海", value: '出售' },
                { name: "重庆", value: 'iPhoneX' },
                { name: "杭州", value: '荣耀10' },
                { name: "武汉", value: '新房' },
                { name: "西安", value: '交易税费' },
                { name: "郑州", value: '抖音' }
            ]
        },

        mapChartInit() {
            var geoCoordMap = {
                "北京": [116.46, 39.92],
                "广州": [113.23, 23.16],
                "深圳": [114.07, 22.62],
                "成都": [104.06, 30.67],
                "上海": [121.48, 31.22],
                "重庆": [106.54, 29.59],
                "杭州": [120.19, 30.26],
                "武汉": [114.31, 30.52],
                "西安": [108.95, 34.27],
                "郑州": [113.65, 34.76]
            };

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            var option = {
                backgroundColor: '#fff',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'transparnt',
                    borderColor: 'transparnt',
                    formatter: function (params) {
                        return `
                        <div class="tooltip-map">
                            <span class="tooltip-map_label">${params.name}</span>
                            <span class="tooltip-map_text">${params.value[2]}</span>
                        </div>
                        `
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'rgb(232, 242, 245)',
                            borderColor: '#fff'
                        },
                        emphasis: {
                            areaColor: 'rgb(232, 242, 245)'
                        }
                    }
                },
                series: [
                    {
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([
                            { name: "北京", value: '限购' },
                            { name: "广州", value: '限贷' },
                            { name: "深圳", value: '首套房' },
                            { name: "成都", value: '贷款' },
                            { name: "上海", value: '出售' },
                            { name: "重庆", value: 'iPhoneX' },
                            { name: "杭州", value: '荣耀10' },
                            { name: "武汉", value: '新房' },
                            { name: "西安", value: '交易税费' },
                            { name: "郑州", value: '抖音' },

                        ]),
                        symbolSize: 12,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        }
                    }
                ]
            }
            this.mapChart.setOption(option);
        },

        randomData() {
            return Array.from({ length: 6 }).map((item) => {
                return Math.floor(Math.random() * 30) + 30
            });
        },

        echartsAnimate() {
            setInterval(() => {
                this.echartsInit(this.randomData());
            }, 2000);
        },

        hotWordChartInit() {
            let data = [
                { name: '狗不理包子', value: 30 },
                { name: '小龙虾', value: 40 },
            ]

            var option = {
                "xAxis": [{
                    zlevel: 20,
                    type: 'value',
                    min: -50,
                    max: 50,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                       show: false
                    },
                    splitLine: {
                        show: false,
                    },
                    splitArea: {
                        show: false,
                    },
                }],
                "yAxis": [{
                    "min": -50,
                    "max": 50,
                    "show": false,
                    "splitLine": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    }
                }],
                "legend": {
                    "show": false,
                    "data": []
                },
                "tooltip": {
                    "showContent": true,
                    trigger: 'item',
                },
                "sendDataSetting": {
                    "selectParams": false,
                    "selectCell": false
                },
                
                "series": [
                    {
                        "name": "狗不理包子",
                        "zlevel": 22,
                        "type": "scatter",
                        "symbol": "circle",
                        "itemStyle": {
                            "normal": {
                                color: 'green'
                            }
                        },
                        label: {
                            color: "red",
                            normal: {
                                textStyle: {
                                    fontSize: 8
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function (param) {
                                    return param.data[2];
                                },
                            }
                        },
                        data: [
                            [56, 16, "狗不理包子", "#FCB03d", 15],
                        ],

                    },
                    {
                        "name": "上升",
                        "zlevel": 20,
                        "type": "scatter",
                        "symbol": "circle",
                        "itemStyle": {
                            "normal": {
                                color: 'skyblue'
                            }
                        },
                        label: {
                            color: "red",
                            normal: {
                                textStyle: {
                                    fontSize: 8
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function (param) {
                                    return param.data[2];
                                },
                            }
                        },
                        data: [
                            [16, 18, "小龙虾", "#FCB03d", 15],
                            
                        ],

                    },
                    
                    
                    {
                        "type": "pie",
                        "radius": ["0", "90%"],
                        "center": ["50%", "50%"],
                        "zlevel": 2,
                        hoverAnimation:false,
                        "avoidLabelOverlap": false,
                        silent: true,
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.05,
                                        "color": "rgba(130,198,255, 0.1)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.95,
                                        "color": "rgba(130,198,255, 0.1)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 100
                        }]
                    }, {
                        "type": "pie",
                        "radius": ["0%", "138%"],
                        "center": ["50%", "50%"],
                        "avoidLabelOverlap": false,
                        silent: true,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.1,
                                        "color": "rgba(130,198,255, 0)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.9,
                                        "color": "rgba(130,198,255, 0)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 3235
                        }]
                    }, {
                        "type": "pie",
                        "radius": ["0%", 359],
                        "center": ["50%", "50%"],
                        "avoidLabelOverlap": false,
                        silent: true,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.2,
                                        "color": "rgba(130,198,255, 0.0)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(130,198,255, 0.2)"
                                    }, {
                                        "offset": 0.88,
                                        "color": "rgba(130,198,255, 0.0)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 3235
                        }]
                    }],


            };
            this.hotWord.setOption(option);
        }
    }

});

