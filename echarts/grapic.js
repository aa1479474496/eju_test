new Vue({
    el: '#app',

    data: {
        message: 'Foo',
        myChart: null
    },

    mounted() {
        this.myChart = echarts.init(this.$refs.myChart);
        this.chartInit();
    },

    methods: {
        chartInit() {
            let option = {
                title: {
                    text: '某地区蒸发量和降水量1',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['蒸发量', '降水量', '测试']
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    top: 94,
                    height: '138px',
                    // containLabel: true
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisTick: {
                            show: false
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                    }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        barWidth: 15
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint: {
                            data: [
                                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                            ]
                        },
                        barWidth: 15
                    },
                    {
                        name: '测试',
                        type: 'line',
                        data: [12.6, 5.9, 19.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 16.0, 12.3],
                        barWidth: 15
                    }
                ]
            };



            let w = this.myChart.getWidth() * 0.8;
            let labelWidth = w / 12;

            let tag = this.createTags(this.myChart.getWidth(), labelWidth);
            option.graphic = [
                {
                    type: 'group',
                    left: '10%',
                    top: 30,
                    bounding: 'raw',
                    silent: true,
                    children: [
                        {
                            type: 'group',
                            left: this.calcLeft(labelWidth, 3),
                            top: 0,
                            bounding: 'raw',
                            children: [
                                {
                                    type: 'line',
                                    left: 0,
                                    shape: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 202
                                    },
                                    style: {
                                        stroke: '#EA4C40'
                                    }
                                },
                                {
                                    type: 'rect',
                                    left: 1,
                                    shape: {
                                        width: 72,
                                        height: 44
                                    },
                                    style: {
                                        fill: '#EA4C40',
                                        stroke: '#EA4C40'
                                    }
                                },
                                {
                                    type: 'text',
                                    z: 100,
                                    top: 8,
                                    left: 6,
                                    style: {
                                        fill: '#FFFFFF',
                                        text: '限售、限贷',
                                        fontSize: '12px'
                                    }
                                },
                                {
                                    type: 'text',
                                    z: 100,
                                    top: 26,
                                    left: 6,
                                    style: {
                                        fill: '#FFFFFF',
                                        text: '2018.07.10',
                                        fontSize: '10px'
                                    }
                                }
                            ]
                        },
                        {
                            type: 'group',
                            left: this.calcLeft(labelWidth, 6),
                            top: 0,
                            bounding: 'raw',
                            children: [
                                {
                                    type: 'line',
                                    left: 0,
                                    shape: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 202
                                    },
                                    style: {
                                        stroke: '#57C8F9'
                                    }
                                },
                                {
                                    type: 'rect',
                                    left: -71,
                                    shape: {
                                        width: 72,
                                        height: 44
                                    },
                                    style: {
                                        fill: '#57C8F9',
                                        stroke: '#57C8F9'
                                    }
                                },
                                {
                                    type: 'text',
                                    z: 100,
                                    top: 8,
                                    left: -64,
                                    style: {
                                        fill: '#FFFFFF',
                                        text: '限售、限贷',
                                        fontSize: '12px'
                                    }
                                },
                                {
                                    type: 'text',
                                    z: 100,
                                    top: 26,
                                    left: -64,
                                    style: {
                                        fill: '#FFFFFF',
                                        text: '2018.07.10',
                                        fontSize: '10px'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]

            console.log('option', option);

            this.myChart.setOption(option);

        },

        calcLeft(labelWidth, n = 1) {
            let itemWidth = 15;
            let itemGap = 0.3;
            let left = labelWidth * n - labelWidth / 2 - itemWidth * itemGap / 2;
            return left;
        },


        createTags(w, labelWidth, n = 3) {
            console.log('labelWidth::', labelWidth);
            let _left = labelWidth * n + w * 0.1 - labelWidth / 2 - 15 * 0.3 / 2;
            console.log('_left', _left);
            return this.createTagLine(_left);
        },

        createTagLine(left) {
            let line = {
                type: 'line',
                left,
                top: 30,
                shape: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 200
                },
                style: {
                    stroke: '#EA4C40'
                }
            }
            return line
        },

        createTagRect() {

        }
    }
})