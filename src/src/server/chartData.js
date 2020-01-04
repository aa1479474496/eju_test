/**
 * pie数据格式组织
 */
export const setPieData = (fetchData, skinObj) => {
    return {
        title: skinObj.title,
        legend: {
            ...skinObj.legend,
            data: fetchData.legenddata
        },
        color: skinObj.color,
        tooltip: skinObj.tooltip,
        series: [
            {
                data: fetchData.relData,
                ...skinObj.series
            }
        ]
    }
}

/**
 * line数据格式组织
 */
export const setlineData = (fetchData, skinObj, area = "", stack = "") => {
    //bi.log(fetchData);
    let xAxis = [],
        series = [],
        index = 0;
    for (let item in fetchData.group) {
        xAxis.push({
            ...skinObj.xAxis,
            data: fetchData.group[item]
        });
        index++
    }
    if (area == "area") {
        for (let item in fetchData.field) {
            series.push({
                type: 'line',
                name: item,
                stack,
                areaStyle: {
                    normal: {}
                },
                smooth: true,
                data: fetchData.field[item]
            });
        }
    } else {
        for (let item in fetchData.field) {
            series.push({ type: 'line', name: item, smooth: true, data: fetchData.field[item] });
        }
    }

    return {
        color: skinObj.color,
        tooltip: skinObj.tooltip,
        legend: {
            ...skinObj.legend,
            data: fetchData.legendData
        },
        title: skinObj.title,
        grid: skinObj.grid,
        xAxis: xAxis,
        yAxis: skinObj.yAxis,
        series: series
    }
}

/**
 * 混合图，bar和line等混合数据结构组织
 */
export const setlinebarData = (fetchData, skinObj) => {
    // bi.log(fetchData);
    let xAxis = [],
        series = [],
        index = 0;
    for (let item in fetchData.group) {
        xAxis.push({
            ...skinObj.xAxis,
            data: fetchData.group[item]
        });
        index++
    }
    if (JSON.stringify(fetchData.field1.data) != "{}") {
        for (let item in fetchData.field1.data) {
            if (fetchData.field1.type == "bar2") {
                series.push({ type: "bar", name: item, smooth: true, stack: "mix", data: fetchData.field1.data[item] });
            } else {
                series.push({ type: fetchData.field1.type, name: item, smooth: true, data: fetchData.field1.data[item] });
            }
        }
    }
    if (JSON.stringify(fetchData.field2.data) != "{}") {
        for (let item in fetchData.field2.data) {

            if (fetchData.field2.type == "bar2") {
                series.push({ type: "bar", smooth: true, name: item, yAxisIndex: 1, stack: "mix", data: fetchData.field2.data[item] });
            } else {
                series.push({ type: fetchData.field2.type, name: item, yAxisIndex: 1, smooth: true, data: fetchData.field2.data[item] });
            }

        }
    }
    return {
        color: skinObj.color,
        tooltip: skinObj.tooltip,
        grid: skinObj.grid,
        legend: {
            ...skinObj.legend,
            data: fetchData.legendData
        },
        title: skinObj.title,
        xAxis: xAxis,
        yAxis: skinObj.yAxis,
        series: series
    }
}

/**
 * bar1数据格式组织
 */
export const setbarData = (fetchData, skinObj, stack = "", hengpai = "") => {
    //  bi.log(skinObj);
    let xAxis = [],
        series = [],
        index = 0;
    for (let item in fetchData.group) {
        xAxis.push({
            ...skinObj.xAxis,
            data: fetchData.group[item]
        });
        index++
    }
    for (let item in fetchData.field) {
        series.push({ type: 'bar', name: item, stack, data: fetchData.field[item] });
    }
    let yAxis = {
        ...skinObj.yAxis
    }
    if (hengpai == "") {
        return {
            color: skinObj.color,
            tooltip: skinObj.tooltip,
            legend: {
                ...skinObj.legend,
                data: fetchData.legendData
            },
            grid: skinObj.grid,
            title: skinObj.title,
            xAxis: xAxis,
            yAxis: yAxis,
            series: series
        }
    } else {
        return {
            color: skinObj.color,
            tooltip: skinObj.tooltip,
            legend: {
                ...skinObj.legend,
                data: fetchData.legendData
            },
            grid: skinObj.grid,
            title: skinObj.title,
            xAxis: yAxis,
            yAxis: xAxis,
            series: series
        }
    }
}

/**
 * radar数据格式组织
 */
export const setradarData = (fetchData, skinObj) => {
    let seriesData = [];
    for (let item in fetchData.series) {
        seriesData.push({ name: item, value: fetchData.series[item] })
    }
    return {
        title: skinObj.title,
        legend: {
            ...skinObj.legend,
            data: fetchData.legendData
        },
        tooltip: skinObj.tooltip,
        color: skinObj.color,
        radar: {
            ...skinObj.radar,
            indicator: fetchData.indicator
        },
        series: [
            {
                type: 'radar',
                ...skinObj.series,
                data: seriesData
            }
        ]
    }
}

/**
 * funnel数据格式组织
 */
export const setfunnelData = (fetchData, skinObj) => {
    return {
        title: {
            text: '漏斗图',
            subtext: '纯属虚构'
        },
        series: [
            {
                name: '预期',
                type: 'funnel',
                left: '10%',
                width: '80%',
                label: {
                    normal: {
                        formatter: '{b}预期'
                    },
                    emphasis: {
                        position: 'inside',
                        formatter: '{b}预期: {c}%'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.7
                    }
                },
                data: [
                    {
                        value: 60,
                        name: '访问'
                    }, {
                        value: 40,
                        name: '咨询'
                    }, {
                        value: 20,
                        name: '订单'
                    }, {
                        value: 80,
                        name: '点击'
                    }, {
                        value: 100,
                        name: '展现'
                    }
                ]
            }
        ]
    }
}

/**
 * map数据格式组织
 */
export const setmapData = (fetchData, skinObj, mapLocation) => {
    // bi.log(mapLocation)
    function convertData(data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
            let geoCoord = mapLocation[data[i].name]
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                })
            }
        }
        return res
    }
    return {
        title: skinObj.title,
        tooltip: skinObj.tooltip,
        geo: skinObj.geo,
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(fetchData),
                symbolSize: function (val) {
                    var sval = parseInt(val[2]);
                    if (sval >= skinObj.symbolSize.small[0].value) {
                        return skinObj.symbolSize.small[0].size;
                    } else if (sval < skinObj.symbolSize.small[0].value && sval >= skinObj.symbolSize.small[1].value) {
                        return skinObj.symbolSize.small[1].size;
                    } else {
                        return skinObj.symbolSize.small[2].size;
                    }
                },
                label: skinObj.smalllabel,
                itemStyle: {
                    normal: {
                        color: skinObj.symbolSize.smallColor
                    }
                }
            }, {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(fetchData.sort((a, b) => b.value - a.value).slice(0, 6)),
                symbolSize: function (val) {
                    return skinObj.symbolSize.big;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: skinObj.biglabel,
                itemStyle: {
                    normal: {
                        color: skinObj.symbolSize.bigcolor,
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }
}
