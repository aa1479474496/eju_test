<template>
  <div>
    <div class="content">
      <div class="start-content">
        <p class="date_title">开始时间</p>
        <div id="start-con" class="date_container container_left">
          <div class="content_scroll">
            <div class="year_con" v-for="item in data" :key="item.year">
              <p class="year" :class="`left_${item.year}`">{{ item.year }}</p>
              <ul>
                <li
                  class="cur_pointer li_item"
                  v-for="month in item.months"
                  :key="month.title"
                  :class="[
                    {
                      active: startTime.time === month.time,
                      disabled: disabled(month),
                      left_active_month: startTime.time === month.time
                    },
                    `left_${item.year}_${month.title}`
                  ]"
                  @click="startHandle(month, disabled(month))"
                >
                  {{ month.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="end-content">
        <p class="date_title">结束时间</p>
        <div class="date_container container_right">
          <div class="content_scroll">
            <div class="year_con" v-for="item in data" :key="item.year">
              <p class="year" :class="`right_${item.year}`">{{ item.year }}</p>
              <ul>
                <li
                  class="cur_pointer li_item"
                  v-for="month in item.months"
                  :key="month.title"
                  :class="[
                    {
                      active: endTime.time === month.time,
                      disabled: disabled(month),
                      right_active_month: endTime.time === month.time
                    },
                    `right_${item.year}_${month.title}`
                  ]"
                  @click="endHandle(month, disabled(month))"
                >
                  {{ month.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer @submit="submit" />
  </div>
</template>
<script>
import Footer from "./footer";
import moment from "moment";

const getYears = ([min, max]) => {
  return [moment(min).year(), moment(max).year()];
};

const formatMonth = (date, monthString) => {
  return `${date.split("-")[0]}年${monthString}`;
};

const getMonth = (date, zero = true) => {
  let month = moment(date).month() + 1;
  if (zero) {
    return month < 10 ? `0${month}` : month;
  }
  return month;
};

export default {
  name: "Month",
  components: {
    Footer
  },
  mounted() {
    this.checkCompleted();
    this.calcDefaultDate();
  },
  data() {
    return {
      data: [],
      startTime: {},
      endTime: {},
      isCompleted: false
    };
  },
  props: {
    dateRange: {
      type: Array,
      default: []
    },
    defaultCount: {
      type: Number,
      default: 13
    },
    selectedDate: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    checkCompleted() {
      // 判断是不是完整月, dateRange[1] 是不是当月最后一天
      this.isCompleted = this.isLastDay(new Date(this.dateRange[1]));
    },

    isLastDay(dt) {
      return new Date(dt.getTime() + 86400000).getDate() === 1;
    },
    calcDefaultDate() {
      const defaultCount = this.isCompleted
        ? Number(this.defaultCount) - 1
        : Number(this.defaultCount);
      let data = [];
      const [min, max] = getYears(this.dateRange);
      let currentYear = max;
      let startDate = moment(this.dateRange[1])
        .subtract(defaultCount, "months")
        .startOf("month");
      if (startDate.format("YYYY-MM-DD") < this.dateRange[0]) {
        startDate = moment(this.dateRange[0]).startOf("month");
      }
      let startMonth = moment(startDate).month() + 1;
      startMonth = startMonth < 10 ? `0${startMonth}` : startMonth;

      let endDate = this.isCompleted
        ? this.dateRange[1]
        : moment(this.dateRange[1])
            .subtract(1, "month")
            .format("YYYY-MM-DD");
      if (endDate < this.dateRange[0]) {
        endDate = this.dateRange[1];
      }
      let endMonth = moment(endDate).month() + 1;
      endMonth = endMonth < 10 ? `0${endMonth}` : endMonth;

      if (this.selectedDate.length) {
        this.startTime = {
          time: moment(this.selectedDate[0]).format("YYYY-MM-DD"),
          title: `${getMonth(this.selectedDate[0])}月`
        };

        this.endTime = {
          time: moment(this.selectedDate[1]).format("YYYY-MM-DD"),
          title: `${getMonth(this.selectedDate[1])}月`
        };
      } else {
        this.startTime = {
          time: startDate.format("YYYY-MM-DD"),
          title: `${startMonth}月`
        };
        this.endTime = {
          time: moment(endDate)
            .startOf("month")
            .format("YYYY-MM-DD"),
          title: `${endMonth}月`
        };
      }
      for (let i = 0; i < max - min + 1; i++) {
        let times = {
          year: currentYear
        };
        let months = [];
        for (let j = 0; j < 12; j++) {
          const monthCount = j + 1 < 10 ? `0${j + 1}` : j + 1;
          let monObj = {
            title: `${monthCount}月`,
            time: `${currentYear}-${monthCount}-01`
          };
          months.push(monObj);
        }
        times.months = months;
        data.push(times);
        currentYear -= 1;
      }
      this.data = data;
      //   this.$nextTick(() => {
      //     this.scrollIntoView();
      //   });
      //   this.$emit("mountedSelect", this.getItem());

      if (this.selectedDate.length) {
        this.$emit("showResult", this.getItem());
      }
    },
    scrollIntoView() {
      let leftDom = document.querySelector(".left_active_month");
      let rightDom = document.querySelector(".right_active_month");
      if (!leftDom) return;

      if (!rightDom) return;

      leftDom.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      rightDom.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    },
    getItem() {
      let start = this.startTime;
      let end = this.endTime;
      if (start.time > end.time) {
        [start, end] = [end, start];
      }
      let startTime = formatMonth(start.time, start.title);
      let endTime = formatMonth(end.time, end.title);

      let selectedTitle = `${startTime} -- ${endTime}`;

      let selectedDate = [
        moment(start.time).format("YYYY-MM"),
        moment(endTime.time).format("YYYY-MM")
      ];

      return {
        unit: "月",
        type: "Month",
        typeI18n: "月度",
        selectedTitle,
        selectedDate
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    clear() {
      this.$emit("clear");
      this.$emit("select", {
        unit: "月",
        type: "Month",
        typeI18n: "月度",
        selectedTitle: "请选择时间",
        selectedDate: ""
      });
    },
    disabled(obj) {
      const judgeNextDate = this.dateRange[1];
      const judgePrevDate = this.dateRange[0];
      const startDate = moment(obj.time)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = moment(obj.time)
        .endOf("month")
        .format("YYYY-MM-DD");
      return startDate > judgeNextDate || endDate < judgePrevDate;
    },
    startHandle(month, disabled) {
      if (disabled) return;

      this.startTime = month;
    },
    endHandle(month, disabled) {
      if (disabled) return;
      this.endTime = month;
    }
  }
};
</script>
<style lang="scss" scoped>
// .content {
//   display: flex;
//   & > div {
//     flex: 1;

//     .date_container {
//       margin-top: 22px;
//       position: relative;
//       //   background: linear-gradient(
//       //    180deg,
//       //     rgba(50,55,69,0) 0%,rgba(50,55,69,1) 100%)
//       //   );

//       //   background: -webkit-gradient(
//       //     linear,
//       //     center top,
//       //     center bottom,
//       //     from(#ccc),
//       //     to(#000)
//       //   );

//       //   background: -webkit-gradient(
//       //     linear,
//       //     50% 100%,
//       //     50% 0%,
//       //     from(#ace),
//       //     to(#f96)
//       //   );

//       //   background: linear-gradient(
//       //     180deg,
//       //     rgba(50, 55, 69, 0) 0%,
//       //     rgba(50, 55, 69, 1) 100%
//       //   );

//       //   linear-gradient(180deg,rgba(50,55,69,0) 0%,rgba(50,55,69,1) 100%);
//       //   from(rgba(50, 55, 69, 1)),
//       // color-stop(88%, rgba(50, 55, 69, 1) 100%),
//       // color-stop(90%, rgba(50, 55, 69, 1) 0%)
//       //   background: linear-gradient(to 10%, blue, red);
//       &::after {
//         // content: "";
//         // position: absolute;
//         // z-index: 3;
//         // left: 1px;
//         // right: 1px;
//         // bottom: 0;
//         // height: 30px;
//         // background: linear-gradient(
//         //   to top,
//         //   rgba(50, 55, 69, 0) 0%,
//         //   rgba(50, 55, 69, 1) 100%
//         // );
//       }

//       &.container_left > div {
//         padding-right: 16px;
//         border-right: 1px solid rgba(255, 255, 255, 0.3);
//       }

//       &.container_right > div {
//         padding-left: 16px;
//         // padding: 0 30px 0 12px;
//       }

//       & > div {
//         // max-height: 256px;
//         height: 256px;
//         overflow-y: auto;

//         &::-webkit-scrollbar {
//           display: none;
//         }
//       }

//       div.year_con {
//         position: relative;
//         z-index: 2;
//         &:not(:first-child) {
//           margin-top: 7px;
//         }
//         p.year {
//           width: 44px;
//           height: 30px;
//           line-height: 30px;
//           text-align: center;
//         }
//         ul {
//           display: flex;
//           flex-wrap: wrap;
//           width: 264px;
//           li {
//             width: 44px;
//             height: 24px;
//             line-height: 24px;
//             text-align: center;
//             &:hover {
//               color: $compon_sec_color;
//             }
//             &.active {
//               color: #fff;
//               background-color: $compon_sec_color;
//             }
//             &.disabled {
//               color: $compon_dark_font_color;
//               &:hover {
//                 cursor: not-allowed;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// .footer {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 8px;
//   padding: 0 30px 0 24px;
// }
</style>
