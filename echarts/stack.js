new Vue({
  el: "#app",

  data() {
    return {
      myChart1: null,
      myChart2: null,
      data1: [11, 22, 343, 44, 55],
      data2: [111, 222, 333, 444, 612]
    };
  },

  mounted() {
    this.myChart1 = echarts.init(this.$refs.myChart1);
    this.myChart2 = echarts.init(this.$refs.myChart2);
    console.log("miunted");

    this.chart1Fun();
    this.chart2Fun();
  },

  methods: {
    chartInit(data) {
      let max_total = Math.max.apply(Math, data) || 1;
      let max_datas = Array.from({ length: data.length }).map(item => {
        return max_total;
      });

      let totalBg = {
        name: "",
        type: "bar",
        yAxisIndex: 1,
        barGap: "-100%",
        data: max_datas,
        silent: true,
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "#999"
          }
        }
      };
      let defaultSeries = {
        name: "测试",
        type: "bar",
        stack: "总量",
        data: data,
        silent: true,
        barWidth: 15,
        barGap: 15
      };

      let series = [totalBg, defaultSeries];

      let option = {
        title: {
          text: "世界人口总量",
          subtext: "数据来自网络"
        },
        tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow"
        //   }
        },
        grid: {
          left: "20%",
          right: "20%",
          bottom: "13%"
          //   containLabel: true
        },
        xAxis: {
          type: "value",
          max: function(value) {
            return value.max;
          }
        },
        yAxis: [
         
          {
            type: 'category',
            inverse: true,
            data: ["巴西", "印尼", "美国", "印度", "中国"],
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
            data: data,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#535D62"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: series
      };

      return option;
    },

    chart1Fun() {
      let option = this.chartInit(this.data1);
      this.myChart1.setOption(option);
    },

    chart2Fun() {
      let option = this.chartInit(this.data2);
      this.myChart2.setOption(option);
    }
  }
});
