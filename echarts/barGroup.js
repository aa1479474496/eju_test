new Vue({
  el: "#app",

  data: {
    message: "test_bargroup1",
    myChart: null,

  },

  mounted() {
    this.myChart = echarts.init(this.$refs.myChart);
    this.chartInit();
  },

  methods: {
    chartInit() {
      let group = ['汇总', 'T1', 'T2', 'T3'];
      let colors = ['#a22125', '#e5e5e5', '#7a94ad', '#dcddd9']

      let groupSeries = this.createGroupSeries(group, colors);
      console.log('groupSeries', groupSeries);
      let option = {
        title: {
          text: '某地区蒸发量和降水量',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['蒸发量', '降水量']
        },
        calculable: true,
        grid: [
          {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            // containLabel: true

          },
          {
            left: 20,
            right: 20,
            bottom: 0,
            height: 20,
            // containLabel: true

          }
        ],
        xAxis: [
          {
            type: 'category',
            gridIndex: 0,
            data: group,

            axisLabel: {
              show: true,
              color: 'transparent'
            },
            axisLine: {
              // show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              inside: true
              // show: false
            }
            // show: false
          },
          {
            type: 'category',
            gridIndex: 1,
            axisLine: {
              show: false
            },
            zlevel: 1
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
            // axisLabel: {
            //   show: true,
            //   color: 'transparent'
            // },
            // axisLine: {
            //   show: false
            // },
            // splitLine: {
            //   show: false
            // },
            // axisTick: {
            //   show: false
            // }
          },
          , {
            type: 'value',
            show: false,
            gridIndex: 1,
            // axisLabel: {
            //   show: true,
            //   color: 'transparent'
            // },
            // axisLine: {
            //   show: false
            // },
            // splitLine: {
            //   show: false
            // },
            // axisTick: {
            //   show: false
            // }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, -7.0, 23.2],
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, -5.9, 9.0, 26.4],
          },
          // {
          //   data: [{
          //     name: '健康',
          //     value: 25
          //   }],
          //   label: {
          //     show: true,
          //     position: 'inside',
          //     formatter: '{b}',
          //     offset: [0, 0],
          //     textStyle: {
          //       color: '#777'
          //     }
          //   },
          //   type: 'bar',
          //   barGap: 0,
          //   barWidth: '30%',
          //   itemStyle: {
          //     normal: {
          //       color: 'red'
          //     }
          //   },
          //   xAxisIndex: 1,
          //   yAxisIndex: 1
          // }, {
          //   data: [{
          //     name: '亚健康',
          //     value: 1
          //   }],
          //   label: {
          //     show: true,
          //     position: 'inside',
          //     formatter: '{b}',
          //     offset: [0, 0],
          //     textStyle: {
          //       color: '#777'
          //     }
          //   },
          //   type: 'bar',
          //   barGap: 0,
          //   barWidth: '70%',
          //   itemStyle: {
          //     normal: {
          //       color: 'skyblue'
          //     }
          //   },
          //   xAxisIndex: 1,
          //   yAxisIndex: 1
          // }
        ]
      };

      if (groupSeries.length) {
        option.series.push(...groupSeries);
      }



      this.myChart.setOption(option);
      console.log("mychart", this.myChart);

      // setTimeout(() => {
      //   var test = this.myChart.getOption();
      //   console.log('test', test);
      //   //   ymax = test.yAxis[0].max;
      //   var ymax = test.yAxis[0].max;
      //   console.log('ymax', ymax);
      // }, 100);

    },

    createGroupSeries(group = [], colors = []) {
      if (!group.length) {
        return [];
      }

      let width = `${parseFloat((100 / group.length).toFixed(2))}%`;

      let data = [2.0, 4.9, -7.0, 23.2, 2.6, -5.9, 9.0, 26.4];

      // let value = data[0];
      // let value = data[1];
      // let value = data[2];
      // let value = data[3];
      // let value = data[4];
      // let value = data[5];
      // let value = data[6];
      let value = data[7];


      function template({ name = '', value = 0, color = "#000", bac = "transparent", width = "100%" }) {
        let _temp = {
          data: [{
            name,
            value
          }],
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            offset: [0, 0],
            textStyle: {
              color
            }
          },
          type: 'bar',
          barGap: 0,
          barWidth: width,
          itemStyle: {
            normal: {
              color: bac
            }
          },
          xAxisIndex: 1,
          yAxisIndex: 1
        }
        return _temp;
      }

      return group.map((_group, index) => {
        let bac = colors[index % group.length];
        let _option = {
          name: _group,
          value,
          width,
          bac
        }
        return template(_option);
      })
    }
  }
});
