<template>
  <div>
    <div class="content">
      <div class="start-content">
        <p class="date_title">开始时间</p>
        <div id="start-con" class="date_container container_left">
          <div class="content_scroll">
            <div class="year_con">
              <ul>
                <li
                  class="cur_pointer year_com_li li_item"
                  v-for="(year, index) in data"
                  :key="index"
                  :class="{ active: startTime == year }"
                  @click="startHandle(year)"
                >
                  {{ year }}
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
            <div class="year_con">
              <ul>
                <li
                  class="cur_pointer year_com_li li_item"
                  v-for="(year, index) in data"
                  :key="index"
                  :class="{ active: endTime == year }"
                  @click="endHandle(year)"
                >
                  {{ year }}
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

const getMonth = (date, zero = true) => {
  let month = moment(date).month() + 1;
  if (zero) {
    return month < 10 ? `0${month}` : month;
  }
  return month;
};

const getDate = (date, zero = true) => {
  let day = moment(date).date();
  if (zero) {
    return day < 10 ? `0${day}` : day;
  }
  return day;
};

export default {
  name: "year",
  components: {
    Footer
  },
  created() {
    this.checkCompleted();
    this.calcDefaultDate();
  },
  data() {
    return {
      data: [],
      startTime: "",
      endTime: "",
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
      default: 5
    },
    isSingle: {
      type: Boolean,
      default: false
    },
    useCompleted: {
      type: Boolean,
      default: true
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
      // 判断是不是完整年, dateRange[1] 是不是当前年最后一天
      let month = getMonth(this.dateRange[1]);
      let date = getDate(this.dateRange[1]);
      this.isCompleted = month == 12 && date == 31;
    },
    calcDefaultDate() {
      const defaultCount = Number(this.defaultCount);
      const [min, max] = getYears(this.dateRange);

      let currentYear = max;

      if (this.selectedDate.length) {
        this.startTime = this.selectedDate[0];
        this.endTime = this.selectedDate[1];
      } else {
        this.endTime = this.useCompleted
          ? this.isCompleted || min === max
            ? max
            : max - 1
          : max;
        this.startTime = max - defaultCount >= min ? max - defaultCount : min;
      }
      let data = [];
      for (let i = 0; i < max - min + 1; i++) {
        data.push(currentYear);
        currentYear -= 1;
      }
      this.data = data;
      if (this.selectedDate.length) {
        this.$emit("showResult", this.getItem());
      }
    },
    getItem() {
      let startDate = this.startTime;
      let endDate = this.endTime;
      if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
      }

      let selectedTitle = `${startDate}年 -- ${endDate}年`;

      let selectedDate = [startDate, endDate];

      return {
        unit: "年",
        type: "Year",
        typeI18n: "年度",
        selectedTitle,
        selectedDate
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    startHandle(year) {
      this.startTime = year;
    },
    endHandle(year) {
      this.endTime = year;
    }
  }
};
</script>
