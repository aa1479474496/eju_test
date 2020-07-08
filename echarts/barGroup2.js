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
      // let group = ['汇总', 'T1'];
      let colors = ['#a22125', '#e5e5e5', '#7a94ad', '#dcddd9']


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
            left: 0,
            right: 0,
            top: 20,
            bottom: 40
          },

        ],
        xAxis: [
          {
            type: 'category',
            gridIndex: 0,
            data: group,

            axisLabel: {
              show: true,
              // color: 'transparent'
              // formatter: [
              //   '{a|{value}}',

              // ].join('\n'),
              
              formatter: function(value, index) {

                let str = `{a${index}|{value}}`;
                console.log('sssss', str);
                return `{a${index}|${value}}`
              },


              rich: {
                a0: {
                  color: 'red',
                  width: 199.99999,
                  backgroundColor: '#a22125',
                  lineHeight: 10
                },
                a1: {
                  color: 'red',
                  width: 199.99999,
                  backgroundColor: '#e5e5e5',
                  lineHeight: 10
                },
                a2: {
                  color: 'red',
                  width: 199.99999,
                  backgroundColor: '#7a94ad',
                  lineHeight: 10
                },
                a3: {
                  color: 'red',
                  width: 199.99999,
                  backgroundColor: '#dcddd9',
                  lineHeight: 10
                }

              },
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
          }
        ]
      };

      this.myChart.setOption(option);
      console.log("mychart", this.myChart);

      // setTimeout(() => {
      //   var test = this.myChart.getOption();
      //   console.log('test', test);
      //   //   ymax = test.yAxis[0].max;
      //   var ymax = test.yAxis[0].max;
      //   console.log('ymax', ymax);
      // }, 100);

    }
  }
});
