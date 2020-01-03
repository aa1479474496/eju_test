import { mockData1 } from "./mockData.js";

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
    // this.myChart2 = echarts.init(this.$refs.myChart2);
    this.myChart3 = echarts.init(this.$refs.myChart3);
    //   console.log("miunted12", mockData1);

    let { aFieldSet, aList } = mockData1.data;
    let statFields = [];
    let groupFields = [];
    aFieldSet.forEach(item => {
      if (item.title == "id") {
        return;
      }
      if (item.type == "stat") {
        statFields.push(item);
      } else if (item.type == "group") {
        groupFields.push(item);
      }
    });

    this.chart3Fun(aList, statFields, groupFields);

    console.log("statFields", statFields);
    console.log("groupFields", groupFields);

    this.chart1Fun();
    // this.chart2Fun();
  },

  methods: {
    chart3Fun(aList, statFields, groupFields) {
      var chartData = {
        id: 111,
        name: "test",
        type: "line",
        data: aList,
        groups: groupFields,
        fields1: statFields,
        fields2: [],
        chart: this.myChart3,
        shownum: false
      };

      // console.log();
      //   console.log("11");
      // debugger
      bi.compile.run(chartData);
    },

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
            type: "category",
            inverse: true,
            data: ["巴西", "印尼", "美国", "印度", "中国"],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
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
