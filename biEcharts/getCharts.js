
var optionsUtils = {
    hotWordRange: [-60, 60],
    hotWordRangeY: [-15, 15],
    hotWordDefalutColor: 'pink',// 首页热词 11名以后统一颜色
    hotWordColors: ['#EB756C', '#FFACAA', '#FFD4AA'], // 首页热词三种颜色 前十 中三十 后十
    heatedMapTimer: null,
    relationColors: {
        "1": '#E98369',
        "0": '#2F4654',
        "-1": '#5AB490'
    },
    relationChartsColors: {
        "1": '#E98369',
        "0": '#839AA8',
        "-1": '#5AB490'
    },
    wordCloudColors: [
        '#21485A',
        '#085077',
        '#1A76AC',
        '#2BA5DD',
        '#66ACCA',
        '#91CEE6',
        '#1884B7',
        '#2588C5',
        '#96C0D0',
        '#07405E'
    ],

    gridColors: ['#F7CB4A', '#C23431', '#07B906', '#3B505F'],
    treemapColors: ['#C23431', '#2F4654', '#61A0A8', '#F7CB4A'],
    infoCountColors: ['#2F4654', '#17B294', '#C23431', '#F7CB4A'], //信息数量走势图
    lineDefaultColor: '#17B294',
    pieColors: ['#C23431', '#2F4654', '#61A0A8', '#F7CB4A'],
    mediaLineColors: ['#07B906', '#C23431', '#F7CB4A', '#2F4555', '#91C7AE'], // 自媒体动态line color
    policyTrendColors: ['#C23431', '#2F4654', '#F7CB4A'],

    province: ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"],
    hotWordPieDatas: [  // 首页 热词配置
        {
            radius: [0, '88%'],
            zlevel: 3,
            colorStops: [{
                "offset": 0,
                "color": "rgba(221,232,253, 1)"
            }, {
                "offset": 1,
                "color": "rgba(221,232,253, 1)"
            }]
        },
        {
            radius: [0, '152%'],
            zlevel: 2,
            colorStops: [{
                "offset": 0,
                "color": "rgba(232,240,254, 1)"
            }, {
                "offset": 1,
                "color": "rgba(232,240,254, 1)"
            }]
        },
        {
            radius: [0, '222%'],
            zlevel: 1,
            colorStops: [{
                "offset": 0,
                "color": "rgba(243,247,254, 1)"
            }, {
                "offset": 1,
                "color": "rgba(243,247,254, 1)"
            }]
        }
    ],

    expandHotWordPieDatas: [
        {
            radius: [0, '88%'],
            zlevel: 3,
            colorStops: [{
                "offset": 0,
                "color": "rgba(221,232,253, 1)"
            }, {
                "offset": 1,
                "color": "rgba(221,232,253, 1)"
            }]
        },
        {
            radius: [0, '180%'],
            zlevel: 2,
            colorStops: [{
                "offset": 0,
                "color": "rgba(232,240,254, 1)"
            }, {
                "offset": 1,
                "color": "rgba(232,240,254, 1)"
            }]
        },
        {
            radius: [0, '280%'],
            zlevel: 1,
            colorStops: [{
                "offset": 0,
                "color": "rgba(243,247,254, 1)"
            }, {
                "offset": 1,
                "color": "rgba(243,247,254, 1)"
            }]
        },
        {
            radius: [0, '380%'],  
            zlevel: 0,
            colorStops: [{
                "offset": 0,
                "color": "rgba(243,247,254, .5)"
            }, {
                "offset": 1,
                "color": "rgba(243,247,254, .5)"
            }]
        }
    ],

    getHotWordsOptions: function (series) {
        console.log('aaaaaaaa');
        let option = {
            "xAxis": [{
                zlevel: 20,
                type: 'value',
                min: optionsUtils.hotWordRange[0],
                max: optionsUtils.hotWordRange[1],
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
                // "min": -50,
                // "max": 50,
                min: optionsUtils.hotWordRangeY[0],
                max: optionsUtils.hotWordRangeY[1],
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
                formatter: function (params) {
                    return params.data[2] + ': ' + params.data[3];
                }
            },
            "sendDataSetting": {
                "selectParams": false,
                "selectCell": false
            },

            "series": series
        };
        return option;
    },

    isEmptyArray(data) {
        if (Array.isArray(data) && !data.length) {
            return true
        }
        return false;
    },

    clearHeatedMapTimer: function () {
        clearInterval(this.heatedMapTimer);
    },

    getHotWordPieSeries: function (datas) {
        let res = datas.map((item, index) => {
            return template(item);
        });
        function template(item) {
            let { radius, colorStops, zlevel = 1 } = item;
            var o = {
                "type": "pie",
                "radius": radius,
                "zlevel": zlevel,
                "center": ["50%", "50%"],
                hoverAnimation: false,
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
                            "colorStops": colorStops
                        }
                    }
                },
                "labelLine": {
                    "normal": {
                        "show": false
                    }
                },
                "data": [{
                    "value": 1
                }]
            }
            return o;
        }

        return res;
    },

    getHotWordCoordinate: function (num, max_n, min_range, max_range, index) {
        let x = max_range - (num / max_n) * max_range || 1;
        x = Math.random() > 0.5 ? x : -x;
        // let y = min_range + Math.floor(Math.random() * (max_range - min_range + 1));
        let y = Math.random() * index + 2;
        y = Math.random() > 0.5 ? y : -y;
        return [x, y]
    },

    createDefaultHotWordSeries: function (datas) {
        let arr = datas.map(item => {
            return parseFloat(item.iNum) || 0;
        });

        let max_n = Math.max.apply(Math, arr) || 1;
        let series = datas.map((item, index) => {
            let { x, y } = item;
            let symbloSize = utils.setRadius(max_n, item.iNum, 15, 30);
            let itemColor = '';
            if (index < 10) {
                itemColor = optionsUtils.hotWordColors[0];
            }
            else if (index < 40) {
                itemColor = optionsUtils.hotWordColors[1];
            }
            else {
                itemColor = optionsUtils.hotWordColors[2];
            }
            // let itemColor = index < 10 ? optionsUtils.hotWordColors[0] : optionsUtils.hotWordColors[1];

            return template({
                name: item.sKeyword,
                itemColor,
                labelColor: '#333',
                text: item.sKeyword,
                x,
                y,
                value: item.iNum,
                radius: symbloSize
            });
        });

        function template(item) {
            let { name, itemColor, labelColor = "#333", text = '', x, y, value, radius = 12 } = item;
            var o = {
                "name": name,
                "zlevel": 22,
                "type": "scatter",
                "symbol": "circle",
                symbolSize: function (param, a) {
                    return radius;
                },
                "itemStyle": {
                    "normal": {
                        color: itemColor
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: labelColor,
                            fontSize: 8
                        },
                        position: 'bottom',
                        show: true,
                        formatter: function (param) {
                            return text;
                        },
                    }
                },
                data: [
                    [x, y, name, value],
                ],

            }
            return o;
        }

        return series;
    },

    createRelationCenter: function (data) {
        let { sKeyword } = data;
        let word = [sKeyword];
        let datas = [
            word
        ]
        let center = {
            zlevel: 20,
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 88,
            left: 'center',
            top: 'middle',
            label: {
                normal: {
                    show: true,
                    formatter: function (param) {
                        return sKeyword;
                    },
                },
            },
            silent: true,
            itemStyle: {
                normal: {
                    color: '#82CCF5',
                },
            },
            data: [
                [0, 0, '', '#82CCF5', 19]
            ],
        }
        return center;
    },

    createRelationWordSeries: function (datas) {
        let arr = datas.map(item => {
            return parseFloat(item.iHot) || 0;
        });
        let max_n = Math.max.apply(Math, arr) || 1;
        let tempDatas = datas.slice(1);
        let series = tempDatas.map((item, index) => {
            let { x, y } = item;
            let symbloSize = utils.setRadius(max_n, item.iHot, 15, 30);
            return template({
                name: item.sKeyword,
                itemColor: optionsUtils.relationChartsColors[item.iEmotion],
                labelColor: '#333',
                text: item.sKeyword,
                x,
                y,
                value: item.iHot,
                radius: symbloSize
            });
        });
        function template(item) {
            let { name, itemColor, labelColor = "#333", text = '', x, y, value, radius = 12 } = item;
            var o = {
                "name": name,
                "zlevel": 222,
                "type": "scatter",
                "symbol": "circle",
                symbolSize: function (param, a) {
                    return radius;
                },
                "itemStyle": {
                    "normal": {
                        color: itemColor
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: labelColor,
                            fontSize: 8
                        },
                        position: 'bottom',
                        show: true,
                        formatter: function (param) {
                            return text;
                        },
                    }
                },
                data: [
                    [x, y, name, value],
                ],

            }
            return o;
        }

        return series;
    },

    createHotWordSeries: function (datas) {
        let arr = datas.map(item => {
            return item.value || 0;
        });

        let max_n = Math.max.apply(Math, arr) || 1;
        let series = datas.map((item, index) => {
            let coordinate = optionsUtils.getHotWordCoordinate(item.value, max_n, optionsUtils.hotWordRange[0], optionsUtils.hotWordRange[1], index);
            let symbloSize = utils.setRadius(max_n, item.value, 10, 30);
            return template({
                name: item.name,
                itemColor: optionsUtils.hotWordColors[index] || optionsUtils.hotWordDefalutColor,
                labelColor: '#333',
                text: item.name,
                x: coordinate[0],
                y: coordinate[1],
                value: item.value,
                radius: symbloSize
            });
        });


        function template(item) {
            let { name, itemColor, labelColor = "#333", text = '', x, y, value, radius = 12 } = item;
            var o = {
                "name": name,
                "zlevel": 22,
                "type": "scatter",
                "symbol": "circle",
                symbolSize: function (param, a) {
                    return radius;
                },
                "itemStyle": {
                    "normal": {
                        color: itemColor
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: labelColor,
                            fontSize: 8
                        },
                        position: 'bottom',
                        show: true,
                        formatter: function (param) {
                            return text;
                        },
                    }
                },
                data: [
                    [x, y, name, value],
                ],

            }
            return o;
        }

        return series;
    },

    createRevelantGroup: function () {
        // let w = $('#main').width();
        let w = 670;
        let centerR = 88;
        let groupW = w - 88 - 10 * 2 - 10 * 2;
        let str = '弱关联性强';
        let dotR = 1;
        let dotMargin = 10;
        let _w = (groupW - str.length * 2 * 16) / 4;
        let n = Math.floor(_w / (dotR + dotMargin));

        let arr = Array.from({ length: n });

        let _arr = ['弱', ...arr, '关联性', ...arr, '强'];
        let _arrRight = ['弱', ...arr, '关联性', ...arr, '强'];

        let len = _arr.length;

        let initLeft = 0;

        let leftChildren = [];
        for (let i = 0; i < len; i++) {
            if (_arr[i]) {
                let str = this.createStr(_arr[i], initLeft);
                initLeft = initLeft + 12 * _arr[i].length + dotMargin;
                leftChildren.push(str);
            }

            else {
                let circle = this.createCicle(initLeft);
                initLeft = initLeft + dotR + dotMargin;
                leftChildren.push(circle);
            }

        }

        let rightChildren = [];
        let initRight = 0;

        for (let i = 0; i < len; i++) {
            if (_arrRight[i]) {
                let str = this.createStr(_arrRight[i], initRight, 'right');
                initRight = initRight + 12 * _arrRight[i].length + dotMargin;
                rightChildren.push(str);
            }

            else {
                let circle = this.createCicle(initRight, 'right');
                initRight = initRight + dotR + dotMargin;
                rightChildren.push(circle);
            }

        }

        let groupLeft = {
            type: 'group',
            bounding: 'raw',
            left: 10,
            silent: true,
            top: 'center',
            zlevel: 1,
            children: leftChildren
        }

        let groupRight = {
            type: 'group',
            bounding: 'raw',
            right: 10,
            silent: true,
            top: 'center',
            zlevel: 1,
            children: rightChildren
        }

        return [groupLeft, groupRight];
    },
    createStr: function (text, position, type) {
        let o = {
            type: 'text',
            top: 'center',
            z: 100,
            zlevel: 300,
            style: {
                fill: '#A2c1F7',
                text: text,
                font: '12px Microsoft YaHei'
            }
        }

        if (type == 'right') {
            o = Object.assign({}, o, {
                right: position,
            });
        }
        else {
            o = Object.assign({}, o, {
                left: position,
            });
        }

        return o;
    },
    createCicle: function (position, type) {
        let o = {
            type: 'circle',
            top: 'center',
            z: 100,
            zlevel: 300,
            shape: {
                r: 2
            },
            style: {
                fill: '#A2c1F7',
            }
        }

        if (type == 'right') {
            o = Object.assign({}, o, {
                right: position,
            })
        }
        else {
            o = Object.assign({}, o, {
                left: position,
            })
        }

        return o;
    },

    rectColors: ['#17B394', '#63BDA2', '#77D1B6', '#8AE4C9'],
    formatterGrapic: function(labelWidth, datas) {
        let count = 0;
        datas.forEach((item, index) => {
            if (Array.isArray(item['axis']) && item['axis'].length) {
                count += item['axis'].length;
            }
        });
        // let labelWidth = count ? gridW / count : count;
        let rects = [];
        let subsectionNames = [];
        let texts = [];
        datas.forEach((item, index) => {
            let len = item['axis'].length;
            let left = this.calcLeft(index, datas, labelWidth);
            let color = this.rectColors[index];
            let rect = this.createRect(len, left, color, labelWidth);
            let subsectionName = this.createSubsectionName(left, len, item['subsectionName'], labelWidth);
            rects.push(rect);
            subsectionNames.push(subsectionName);

            for (let i = 0; i < len; i++) {
                let text = this.createText(left, item['axis'][i], i, labelWidth);
                texts.push(text);
            }
        });
        let arr = [];
        arr.push(...rects, ...subsectionNames, ...texts);
        return arr;
    },

    createSubsectionName(left, len, name, labelWidth) {
        let positionLeft = left +  (len * labelWidth) / 2 - 9;
        let subsection = {
            type: 'text',
            left:positionLeft,
            bottom: '-20',
            z: 100,
            style: {
                fill: '#fff',
                text: name,
                font: '18px Microsoft YaHei'
            }
        }
        return subsection;
    },

    createText(left, lableText, index, labelWidth) {
        let positionLeft = left + index * labelWidth + (labelWidth - lableText.length * 5 ) / 2;
        let text = {
            type: 'text',
            left:positionLeft,
            bottom: '0',
            z: 100,
            style: {
                text: lableText,
                font: '10px Microsoft YaHei',
                fill: '#fff',
            }
        }
        return text;
    },

    calcLeft(index, datas, labelWidth) {
        if (index == 0) {
            return 0;
        }
        let left = 0;
        while(index) {
            left = left + datas[index - 1]['axis'].length * labelWidth;

            index--;
        }
        return left;
    },

    createRect(n ,left, fillColor, labelWidth) {
        let w = n * labelWidth;
        let rect = {
            type: 'rect',
            z: 100,
            left,
            top: 'middle',
            shape: {
                width: w,
                height: 42
            },
            style: {
                fill: fillColor
            }
        }
        return rect;
    },
}

var chartsUtils = {

    // 首页地图
    mapCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let arr = data.map(item => {
            return parseFloat(item.value) || 0;
        });
        let max_n = Math.max.apply(Math, arr) || 1;

        let convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                if (Array.isArray(data[i].coordinate) && data[i].coordinate.length) {
                    let { name, value, coordinate, text } = data[i]
                    res.push({
                        name: data[i].name,
                        value: [...coordinate, text, value]
                    });
                }
            }
            return res;
        };

        let option = {
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'transparnt',
                borderColor: 'transparnt',
                formatter: function (params) {
                    return utils.createMapToolTip(params.name, params.value[2]);
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
                    name: '区域热词',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: function (val) {
                        let r = utils.setRadius(max_n, val[3]);
                        return r;
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: config.itemColor || '#56cff7'
                        },
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                }
            ]
        }
        e.setOption(option);

    },

    // 方案監測 地圖

    heatedMapCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }

        let initArea = data.map(item => {
            return item.name;
        });

        let len = optionsUtils.province.length;
        for (let i = 0; i < len; i++) {
            if (!initArea.includes(optionsUtils.province[i])) {
                data.push({
                    name: optionsUtils.province[i],
                    value: 0
                })
            }
        }
        let tempValue = data[0].value;
        let tempIndex = 0;
        data[0].value = 55668899;

        let yData = [];
        let option = {
            tooltip: {
                show: true,
                formatter: function (params) {
                    return params.name
                },
            },
            visualMap: {
                show: false,
                type: 'piecewise',
                pieces: [
                    { min: 20000, value: 55668899, color: '#30C7F7' }, // 表示 value 等于 123 的情况。
                    { min: 0.1, max: 20000, color: '#B1EAFC' },
                    { value: 0, color: '#DAF4FE' }     // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                orient: 'horizontal',
                itemWidth: 10,
                itemHeight: 80,
                text: ['高', '低'],
                showLabel: true,
                seriesIndex: [0],
                min: 0,
                max: 2,
                inRange: {
                    color: ['#daf4fe', '#b1eafc']
                },
                textStyle: {
                    color: '#7B93A7'
                },
                bottom: 30,
                left: 'left',
            },
            grid: {
                right: 10,
                top: 135,
                bottom: 100,
                width: '20%'
            },
            xAxis: {
                show: false
            },
            yAxis: {
                type: 'category',
                inverse: true,
                nameGap: 16,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    interval: 0,
                    margin: 85,
                    textStyle: {
                        color: '#455A74',
                        align: 'left',
                        fontSize: 14
                    },


                },
                data: yData
            },
            geo: {
                map: 'china',
                left: 'left',
                top: 0,
                width: '100%',
                layoutSize: '100%',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    areaColor: '#daf4fe',
                    emphasis: {
                        areaColor: '#30c7f7'
                    }
                }
            },
            series: [{
                name: 'mapSer',
                type: 'map',
                mapType: 'china',
                roam: false,
                geoIndex: 0,
                selectedMode: 'single',
                label: {
                    show: false,
                },
                data: data
            }]

        };
        this._run(e, option);
        e.on('click', (params) => {
            let { dataIndex, name, value = 0 } = params;
            if (dataIndex == tempIndex) {
                return;
            }
            data[tempIndex].value = tempValue;
            tempValue = value;
            tempIndex = dataIndex;
            if (!data[dataIndex]) {
                data[dataIndex] = {
                    name,
                    value
                }
            }
            data[dataIndex].value = 55668899;
            if (config && config.cb) {
                optionsUtils.clearHeatedMapTimer();
                config.cb(name);
            }
            e.setOption(option);
        });

        var index = 0;
        optionsUtils.heatedMapTimer = setInterval(() => {
            if (config.highLight) {
                index++;
                index = index > 9 ? 0 : index;
                data[tempIndex].value = tempValue;
                tempIndex = index;
                tempValue = data[index].value;
                data[index].value = 55668899;
                config.highLight(index);
                e.setOption(option);
            }
        }, 3000);
        return;
    },

    defaultWordsCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let hotWordSeries = optionsUtils.createDefaultHotWordSeries(data);
        let pieSeries = optionsUtils.getHotWordPieSeries(optionsUtils.hotWordPieDatas);
        let series = hotWordSeries.concat(pieSeries);
        let option = optionsUtils.getHotWordsOptions(series);
        this._run(e, option);
    },

    highattentionWordsCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let hotWordSeries = optionsUtils.createDefaultHotWordSeries(data);
        let pieSeries = optionsUtils.getHotWordPieSeries(optionsUtils.expandHotWordPieDatas);
        console.log('pieSeries', pieSeries);
        let series = hotWordSeries.concat(pieSeries);
        let option = optionsUtils.getHotWordsOptions(series);
        this._run(e, option);
    },

    revelantWordsCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let center = optionsUtils.createRelationCenter(data[0]);
        let hotWordSeries = optionsUtils.createRelationWordSeries(data);
        hotWordSeries.push(center);
        let pieSeries = optionsUtils.getHotWordPieSeries(optionsUtils.hotWordPieDatas);
        let series = hotWordSeries.concat(pieSeries);
        let option = optionsUtils.getHotWordsOptions(series);
        let group = optionsUtils.createRevelantGroup();
        option.graphic = group;
        this._run(e, option);
    },

    hotWordCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let hotWordSeries = optionsUtils.createHotWordSeries(data);
        let pieSeries = optionsUtils.getHotWordPieSeries(optionsUtils.hotWordPieDatas);
        let series = hotWordSeries.concat(pieSeries);
        let option = {
            "xAxis": [{
                zlevel: 20,
                type: 'value',
                min: optionsUtils.hotWordRange[0],
                max: optionsUtils.hotWordRange[1],
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
                formatter: function (params) {
                    return params.data[3];
                }
            },
            "sendDataSetting": {
                "selectParams": false,
                "selectCell": false
            },

            "series": series
        };
        e.setOption(option);
    },

    infoCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }

        let { series = [], xAxis } = data;
        let legendData = series.map(item => {
            return item.name
        });

        let legend = {
            bottom: config.bottom || 0,
            data: legendData,
            textStyle: {
                color: '#666',
                fontSize: 12
            },
            itemGap: 36
        }

        let grid = {
            top: '20px',
            height: '138px'
        };

        let serieDatas = series.map((item, index) => {
            let { name, type, data } = item;
            let color = config.lineColor || optionsUtils.infoCountColors[index] || optionsUtils.lineDefaultColor;
            if (config.colors) {
                color = config.colors[index];
            }
            let serie = {
                name,
                type,
                data,
                itemStyle: {
                    color
                }
            }
            if (type == 'bar') {
                serie = Object.assign({}, serie, { barWidth: 15 })
            }
            return serie;
        });
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend,
            grid,
            xAxis: {
                type: 'category',
                data: xAxis,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#999',
                    fontSize: 10
                },

            },
            yAxis: {
                type: 'value',
                splitNumber: 3,
                axisLabel: {
                    color: '#999',
                    fontSize: 10
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#d2d2d2'
                    }
                }
            },
            series: serieDatas
        };

        option = Object.assign({}, option, config.option);
        this._run(e, option);
    },

    accountTypeCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        var hashTree = {};
        var total = 0;
        data.forEach(function (item, index) {
            hashTree[item.name] = item;
            total += item.value;
        });
        total = total ? total : 1;
        var legendData = data.map(function (item) {
            return item.name;
        });
        function calcPercent(name) {
            if (!hashTree[name]) {
                return;
            }

            let base = hashTree[name].value;
            return parseFloat((hashTree[name].value / total * 100).toFixed(2));
        }

        let option = {
            color: optionsUtils.pieColors,
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            legend: {
                data: legendData,
                orient: "vartical",
                x: "left",
                top: 'center',
                left: 214,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 12,
                textStyle: {
                    color: '#666'
                },

                formatter: function (name, params) {
                    var result = calcPercent(name);
                    return '' + name + '    ' + result + '%';
                }
            },
            series: [
                {
                    name: config.title || '',
                    type: 'pie',
                    radius: config.radius || [60, 85],
                    center: config.center || ['50%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }
            ]
        };
        e.setOption(option);
    },

    selectedPieCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let legend = '';
        if (config.legend) {
            legend = config.legend;
        }
        else {
            let legendData = data.map(item => {
                return item.name
            });
            legend = {
                data: legendData,
                orient: "vartical",
                x: "left",
                itemWidth: 14,
                itemHeight: 14,
                textStyle: {
                    color: '#666'
                },
            }
        }

        data.forEach((item, index) => {
            if (index == 0) {
                item.selected = true;
            }
        });

        let filterData = data.filter(item => {
            return item.value > 0;
        });

        let colors = data.map(item => {
            return item.color
        });

        let option = {
            color: colors,
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            legend,
            series: [
                {
                    name: config.title || '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: config.radius || [0, 125],
                    center: config.center || ['50%', '50%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: filterData
                },
            ]
        };
        e.setOption(option);
    },

    wordCloudCharts: function (chart, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let option = {
            tooltip: {
                show: true
            },
            series: [{
                type: 'wordCloud',
                sizeRange: [12, 30],
                rotationRange: [0, 90],
                rotationStep: 90,
                width: '100%',
                height: '100%',
                textStyle: {
                    normal: {
                        color: function () {
                            let random = Math.round(Math.random() * 9);
                            let itemColor = optionsUtils.wordCloudColors[random];
                            return itemColor;
                        }
                    }
                },
                data
            }]
        };
        this._run(chart, option);
    },

    treeGraphCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let colors = config.color || optionsUtils.treemapColors;
        data.forEach((item, index) => {
            item.color = [colors[index]]
        });
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: function (info) {
                    let { name, value } = info;
                    return `${name}: ${value}%`;
                }
            },
            series: [{
                width: '100%',
                height: '100%',
                type: 'treemap',
                nodeClick: false,
                // silent: true,
                roam: false,
                breadcrumb: {
                    show: false
                },
                data
            }]
        }
        this._run(e, option);
    },

    displayPieCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let title = ''
        if (config.commntTotal) {
            title = [
                {
                    text: config.commntTotal,
                    x: 'center',
                    top: '24',
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: ['#666']
                    }
                },
                {
                    text: config.subTitle || '评论数',
                    x: 'center',
                    top: '40',
                    textStyle: {
                        fontSize: 11,
                        fontWeight: 'normal',
                        color: ['#666']
                    }
                }
            ]
        }

        let option = {
            title,
            color: optionsUtils.pieColors,
            legend: {
                show: false
            },
            series: [
                {
                    name: 'account',
                    type: 'pie',
                    radius: config.radius || ['72%', '100%'],
                    cursor: 'normal',
                    hoverAnimation: false,
                    avoidLabelOverlap: false,
                    silent: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }

                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data
                }
            ]
        };
        this._run(e, option);
    },

    commentsStackCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        // let yAxisName = [];
        // let yAxisDatas = [];
        // let goodDatas = [];
        // let commonDatas = [];
        // let badDatas = [];
        // data.forEach(item => {
        //     yAxisName.push(item.name);
        //     yAxisDatas.push(item.totalNum);
        //     goodDatas.push(item.goodNum);
        //     commonDatas.push(item.commonNum);
        //     badDatas.push(item.badNum);
        // });
        let yAxisName = [];
        let yAxisDatas = [];
        let goodDatas = [];
        let commonDatas = [];
        let badDatas = [];

        yAxisDatas = data.map(item => {
            return item.totalNum
        });

        let max_total = Math.max.apply(Math, yAxisDatas) || 1;
        let max_datas = Array.from({ length: data.length }).map(item => {
            return max_total;
        });

        function transformDatas(data, total, max) { // 各个条目的最大值不一样, 为了保证总长度相同, 对数据进行了系数的加大
            if (total == max) {
                return data;
            }

            return Math.round(data * max / total);
        }


        data.forEach(item => {
            yAxisName.push(item.name);
            goodDatas.push(transformDatas(item.goodNum, item.totalNum, max_total));
            commonDatas.push(transformDatas(item.commonNum, item.totalNum, max_total));
            badDatas.push(transformDatas(item.badNum, item.totalNum, max_total));
        });


        // data.forEach(item => {
        //     yAxisName.push(item.name);
        //     yAxisDatas.push(item.totalNum);
        //     goodDatas.push(item.goodNum);
        //     commonDatas.push(item.commonNum);
        //     badDatas.push(item.badNum);
        // });

        // let max_total = Math.max.apply(Math, yAxisDatas) || 1;
        // let max_datas = Array.from({ length: data.length }).map(item => {
        //     return max_total;
        // });

        let goodSeries = {
            name: '好评',
            type: 'bar',
            stack: '总量',
            data: goodDatas,
            silent: true,
            barWidth: 15,
            barGap: 15,
        }

        let commonSeries = {
            name: '中评',
            type: 'bar',
            stack: '总量',
            data: commonDatas,
            silent: true,
            barWidth: 15,
            barGap: 15,
        }

        let badSeries = {
            name: '差评',
            type: 'bar',
            stack: '总量',
            data: badDatas,
            silent: true,
            barWidth: 15,
            barGap: 15,
        }

        let totalBg = {
            name: '',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: max_datas,
            silent: true,
            barWidth: 15,
            itemStyle: {
                normal: {
                    color: '#fff',
                }
            }
        }

        let series = [totalBg, goodSeries, commonSeries, badSeries];
        let option = {
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    // debugger
                    let goodValue = parseFloat(params[0].value) || 0;
                    let commonValue = parseFloat(params[1].value) || 0;
                    let badValue = parseFloat(params[2].value) || 0;
                    let total = (goodValue + commonValue + badValue) || 1;
                    let goodPercent = `${parseFloat(((goodValue / total) * 100).toFixed(2))}%`;
                    return `好评率: ${goodPercent}`;

                }
            },
            grid: {
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                containLabel: true
            },
            xAxis: {
                show: false

            },
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    data: yAxisName,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false
                    },
                },
                {
                    show: true,
                    inverse: true,
                    data: yAxisDatas,
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#535D62',
                        },
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },

                }
            ],
            series
        };
        this._run(e, option);

    },

    radarCharts: function (e, data, config = {}) {
        let flag = optionsUtils.isEmptyArray(data);
        if (flag) {
            return;
        }
        let value = data.map(item => {
            return item.value
        });

        let max_n = Math.max.apply(Math, value) || 1;

        let indicator = data.map(item => {
            return {
                name: item.name,
                max: max_n
            }
        });
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            radar: {
                shape: 'circle',
                name: {
                    textStyle: {
                        color: '#535D62',
                    }
                },
                radius: '74%',
                nameGap: 6,
                indicator
            },
            series: [{
                name: config.seriesname || '',
                // silent: true,
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                lineStyle: {
                    color: '#15BC97'
                },
                itemStyle: {
                    color: '#15BC97'
                },
                areaStyle: { color: '#15BC97' },
                data: [
                    {
                        value,
                        name: ''
                    },

                ]
            }]
        };
        this._run(e, option);
    },

    gridCharts: function (e, data, config = {}) {
        let colors = config.color || optionsUtils.gridColors;
        let flag = optionsUtils.isEmptyArray(data.series);
        if (flag) {
            return;
        }

        function calcMinAndMax(series) {
            let values = series.map((item, index) => {
                let min = Math.min.apply(Math, item.data);
                let max = Math.max.apply(Math, item.data);
                return [min, max]
            });
            let sortArr = values.sort((a, b) => {
                return b[1] - a[1];
            });

            return sortArr[0];
        }
        function createYAxis(series) {
            let range = calcMinAndMax(series);
            let min = range[0];
            return series.map((item, index) => {
                let show = index > 1 ? false : true;
                let position = index == 0 ? 'left' : 'right';
                let color = colors[index];
                let splitLine = {
                    show: false
                }

                if (index == 0) {
                    splitLine = {
                        show: true,
                        lineStyle: {
                            color: '#C5D0DE'
                        }
                    }
                }
                let template = {
                    type: 'value',
                    show,
                    name: item.name,
                    nameTextStyle: {
                        color: '#333',
                        fontSize: 11
                    },
                    position,
                    splitNumber: 5,
                    // min: range[0],
                    min: 0,
                    // max: range[1],
                    axisLabel: {
                        color: '#999',
                        formatter: '{value}'
                    },
                    splitLine,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#C5D0DE'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                }
                return template
            });
        }

        let yAxis = createYAxis(data.series);

        let zoodEnd = 25;
        if (data.xAxis.length < 10) {
            zoodEnd = 100;
        }
        else {
            zoodEnd = Math.round(9 / data.xAxis.length * 100)
        }
        let option = {
            title: {
                text: config.title || '',
                top: 18,
                left: 'center',
                textStyle: {
                    color: '#333',
                    fontSize: 14
                }
            },
            color: colors,
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: 0,
                right: 0,
                width: '100%',
                height: 174,
                containLabel: true
            },
            dataZoom: [
                {
                    type: 'inside',
                    show: true,
                    xAxisIndex: [0],
                    start: 0,
                    end: zoodEnd,
                    // end: 100,
                    filterMode: 'weakFilter',
                    zoomLock: true
                }

            ],
            legend: {
                show: true,
                bottom: 0,
                itemGap: 66
            },

            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        color: '#999'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#C5D0DE'
                        }
                    },
                    data: data.xAxis
                }
            ],
            yAxis,
            series: data.series
        };
        this._run(e, option)

    },

    policyTrendCharts: function (e, data, config = {}) {

        let { series, xAxis, yAxis = [], range } = data;
        let colors = config.color || optionsUtils.policyTrendColors;
        let gridW = e.getWidth() * 0.8;
        let labelWidth = gridW / xAxis.length;
        let graphicLabelChildren = optionsUtils.formatterGrapic(labelWidth, range);
        let markPoint = {
            data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
            ]
        }
        series.forEach((item, index) => {
            series[index] = Object.assign({}, item, { markPoint }, {barWidth: 15});
        });

        let leftArr = [];
        let rightArr = [];
        let _yAxis = null;

        if (yAxis && yAxis.length) {
            _yAxis = []
            // 设置左右y周刻度相同

            series.forEach(item => {
                if (item.type == 'bar') {
                    leftArr = leftArr.concat(item.data)
                } else if (item.type == 'line') {
                    rightArr = rightArr.concat(item.data)
                }

            })
            let yMax1 = Math.ceil(Math.max.apply(null, leftArr)); //左轴最大值
            let yMax2 = Math.ceil(Math.max.apply(null, rightArr)); //左轴最大值
            let interval_left = Math.ceil(yMax1 / 4); //左轴间隔
            let interval_right = Math.ceil(yMax2 / 4); //右轴间隔
            yAxis.forEach((item, index) => {

                let list = {
                    type: 'value',
                    name: item.name,
                    min: 0,
                    max: index == 0 ? yMax1 : yMax2,
                    interval: index == 0 ? interval_left : interval_right,
                    nameTextStyle: {
                        color: '#333',
                        padding: [0, 0, 0, -30]
                    },
                    nameGap: 20,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#999999',
                        formatter: '{value}'
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(197,208,222,0.3)'
                        }
                    }

                }
                _yAxis.push(list)
            });

            if (_yAxis[1]) {
                _yAxis[1].nameTextStyle.padding =[0, -25, 0, 0]
                _yAxis[1].splitLine.show = false
            }
        }
        else {
            _yAxis = {
                type: 'value',
                nameTextStyle: {
                    color: '#999',
                    padding: [0, 0, 0, -30]
                },
                nameGap: 20,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#999999',
                    formatter: '{value}'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(197,208,222,0.3)'
                    }
                }
            }
        }

        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['成交总建', '供应总建', '楼板价'],
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
            },
            color: colors,
            grid: {
                left: '10%',
                right: '10%',
                top: 94,
                height: '138px',
                // containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxis,
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(197,208,222,0.3)'
                        }
                    }
                }
            ],
            yAxis: _yAxis,
            series,
            graphic: [
                {
                    type: 'group',
                    width: gridW,
                    left: '10%',
                    right: '10%',
                    bottom: 35,
                    children: graphicLabelChildren
                }
            ],
        };

        this._run(e, option);
        window.addEventListener("resize", () => {
            let gridW = e.getWidth() * 0.8;
            let labelWidth = gridW / xAxis.length;
            let graphicLabelChildren = optionsUtils.formatterGrapic(labelWidth, range);
            e.setOption({
                graphic: [
                    {
                        type: 'group',
                        width: gridW,
                        left: '10%',
                        right: '10%',
                        bottom: 35,
                        children: graphicLabelChildren
                    }
                ],
            })

            e.resize();
        });
    },


    _run: function (chart, option) {
        chart.setOption(option, true);
        window.addEventListener("resize", () => {
            chart.resize();
        });
        setTimeout(() => {
            chart.resize();
        }, 0);
    }
}
