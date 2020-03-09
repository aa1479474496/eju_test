<template>
  <div class="month-complete">
    <div class="header">
      <p class="header_left">
        最新
        <span>{{ activeMonthIndex + 1 }}</span>
        个完整月
      </p>
      <p class="header_left">
        <span>{{ handleI18n(startTime) }}</span>
        --
        <span>{{ handleI18n(endTime) }}</span>
      </p>
    </div>
    <ul class="content">
      <li
        class="cur_pointer"
        v-for="(item, index) in times"
        :key="index"
        :class="{ active: activeMonthIndex === index, disabled: item === '' }"
        @click="chooseTime(item, index)"
      >
        {{ index + 1 }}
      </li>
    </ul>
    <Footer @submit="submit" />
  </div>
</template>
<script>
import Footer from "./footer";
import moment from "moment";
import {
  values,
  concat,
  slice,
  fill,
  sortBy,
  keys,
  map,
  cloneDeep,
  reverse
} from "lodash";

const formatListValue = list => {
  const defaultList = cloneDeep(list);
  const showList = sortBy(keys(defaultList), item => -item);
  const listArray = map(showList, item => {
    return reverse(defaultList[item]);
  });
  const lists = slice(concat(...listArray), 0, 60);
  return lists;
};

export default {
  name: "MonthComplete",
  components: {
    Footer
  },
  created() {
    this.createList();
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
      activeMonth: "",
      endTime: "",
      startTime: "",
      monthList: {}
    };
  },
  methods: {
    createList() {
      const startOfMonth = moment(this.dateRange[0])
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment(this.dateRange[1])
        .endOf("month")
        .format("YYYY-MM-DD");

      let _arr = [];
      if (startOfMonth != this.dateRange[0]) {
        let _s = moment(this.dateRange[0])
          .startOf("month")
          .subtract("month", -1)
          .format("YYYY-MM-DD");
        let _sY = moment(_s).year();
        let _sM = moment(_s).month() + 1;
        let _rs = `${_sY}-${_sM}`;
        _arr.push(_rs);
      } else {
        let _sY = moment(this.dateRange[0]).year();
        let _sM = moment(this.dateRange[0]).month() + 1;
        let _rs = `${_sY}-${_sM}`;
        _arr.push(_rs);
      }

      if (endOfMonth != this.dateRange[1]) {
        let _s = moment(this.dateRange[1])
          .startOf("month")
          .subtract(1, "months")
          .format("YYYY-MM-DD");
        let _sY = moment(_s).year();
        let _sM = moment(_s).month() + 1;
        let _rs = `${_sY}-${_sM}`;
        _arr.push(_rs);
      } else {
        let _sY = moment(this.dateRange[1]).year();
        let _sM = moment(this.dateRange[1]).month() + 1;
        let _rs = `${_sY}-${_sM}`;
        _arr.push(_rs);
      }

      let _sYear = _arr[0].split("-")[0];
      let _eYear = _arr[1].split("-")[0];
      let list = {};
      for (let i = _sYear; i <= _eYear; i++) {
        if (!list[i]) {
          list[i] = [];
        }
        let _sMonth = 1;
        let _eMonth = 12;

        if (i == _sYear) {
          _sMonth = _arr[0].split("-")[1];
        }
        if (i == _eYear) {
          _eMonth = _arr[1].split("-")[1];
        }

        for (let j = _sMonth; j <= _eMonth; j++) {
          let _m = j < 10 ? `0${j}` : j;
          let _rs = `${i}-${_m}`;
          list[i].push(_rs);
        }
      }

      this.monthList = list;
    },
    calcDefaultDate() {
      const times = formatListValue(this.monthList);
      this.activeMonthIndex = times.length < 13 ? times.length - 1 : 12;
      this.times =
        times.length < 60
          ? [...times, ...fill(Array(60 - times.length), "")]
          : times;
      this.endTime = times[0];
      this.startTime = times[this.activeMonthIndex];

      if (this.selectedDate.length) {
        this.secInit(times);
      }
    },
    secInit(times) {
      this.activeMonthIndex = times.findIndex(time => {
        return time == this.selectedDate[0];
      });
      this.startTime = times[this.activeMonthIndex];
      this.$emit("showResult", this.getItem());
    },
    getItem() {
      return {
        unit: "月",
        type: "MonthComplete",
        typeI18n: `最新${this.activeMonthIndex + 1}个完整月`,
        defaultType: "最新完整月",
        selectedTitle: "",
        selectedDate: [this.startTime, this.endTime]
      };
      //   selectedTitle: `${this.handleI18n(this.startTime)}--${this.handleI18n(
      //       this.endTime
      //     )}`,
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    chooseTime(item, index) {
      if (item === "") return;
      this.activeMonthIndex = index;
      this.startTime = item;
    },
    handleI18n(date) {
      if (!date) return "";

      const array = date.split("-");
      return `${array[0]}年${array[1]}月`;
    }
  }
};
</script>
