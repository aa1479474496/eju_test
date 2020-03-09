<template>
  <div class="month-complete">
    <div class="header">
      <p class="header_left">
        最新
        <span>{{ activeMonthIndex + 1 }}</span>
        个完整周
      </p>
      <div class="header_right">
        <p class="main">
          <span>{{ startTime.title }}</span>
          --
          <span>{{ endTime.title }}</span>
        </p>
        <p class="remark">
          {{
            `${handleDate(startTime.time[0])} -- ${handleDate(endTime.time[1])}`
          }}
        </p>
      </div>
    </div>
    <ul class="content">
      <template v-for="(item, index) in times">
        <li
          class="cur_pointer"
          :key="index"
          :class="{
            active: activeMonthIndex === index,
            disabled: item.time === ''
          }"
          @click="chooseTime(item, index)"
        >
          {{ index + 1 }}
        </li>
      </template>
    </ul>
    <Footer @submit="submit" />
  </div>
</template>
<script>
import Footer from "./footer";
import moment from "moment";
import { reverse, keys, fill, sortBy, each, slice, cloneDeep } from "lodash";

const formatListValue = (list, endTime) => {
  const defaultList = cloneDeep(list);
  const showList = sortBy(keys(defaultList), item => -item);
  let listArray = [];
  each(showList, year => {
    each(reverse(defaultList[year]), week => {
      const { weekCount, weekRange } = week;

      listArray.push({
        title: `${year}年${weekCount < 10 ? "0" + weekCount : weekCount}周`,
        time: weekRange
      });
    });
  });
  let isCompleted = moment(endTime).days() === 0;
  if (!isCompleted) {
    listArray = slice(listArray, 1, 61);
  } else {
    listArray = slice(listArray, 0, 60);
  }
  return listArray;
};

const formateDateWithRegx = date => {
  return date.replace(/(-)/g, "/");
};

export default {
  name: "WeekComplete",
  components: {
    Footer
  },
  created() {
    this.calcDefaultDate();
  },
  props: {
    weekList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dateRange: {
      type: Array,
      default: []
    },
    selectedDate: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      times: [],
      activeMonthIndex: 13,
      endTime: {},
      startTime: {}
    };
  },
  methods: {
    calcDefaultDate() {
      const times = formatListValue(this.weekList, this.dateRange[1]);

      this.activeMonthIndex = times.length < 13 ? times.length - 1 : 12;
      this.times =
        times.length < 60
          ? [
              ...times,
              ...fill(Array(60 - times.length), {
                title: "",
                time: ""
              })
            ]
          : times;

      this.endTime = times[0];
      this.startTime = times[this.activeMonthIndex];

      if (this.selectedDate.length) {
        this.secInit(times);
      }
    },
    secInit(times) {
      let sIndex = times.findIndex(time => {
        return time.time[0] == this.selectedDate[0];
      });
      this.activeMonthIndex = sIndex;
      this.startTime = times[this.activeMonthIndex];
      this.$emit("showResult", this.getItem());
    },
    getItem() {
      let secStart = this.startTime.time[0];
      let secEnd = this.endTime.time[1];
      return {
        unit: "周",
        type: "WeekComplete",
        typeI18n: `最新${this.activeMonthIndex + 1}个完整周`,
        defaultType: "最新完整周",
        selectedTitle: "",
        selectedDate: [secStart, secEnd]
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    chooseTime(item, index) {
      if (item.time === "") return;
      this.startTime = item;
      this.activeMonthIndex = index;
    },
    handleDate(date) {
      return formateDateWithRegx(date);
    }
  }
};
</script>
<style lang="scss" scoped>
// .month-complete {
//   .header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     & > p {
//       line-height: 52px;
//       &.header_left {
//         font-size: 16px;
//       }
//       span {
//         color: $compon_sec_color;
//         font-weight: 700;
//       }
//     }

//     .header_right {
//       text-align: right;
//       .main {
//         color: $compon_sec_color;
//         line-height: 24px;
//         .remark {
//           font-size: 12px;
//           color: $g_text_color;
//           opacity: 0.5;
//         }
//       }
//     }
//   }

//   .content {
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//     width: 552px;
//     font-size: 12px;
//     color: $g_text_color;

//     li {
//       width: 40px;
//       height: 32px;
//       line-height: 32px;
//       text-align: center;
//       margin: 0 15px 8px 0;
//       &.active {
//         color: #fff;
//         background-color: $compon_sec_color;
//       }
//     }
//   }
// }
</style>
