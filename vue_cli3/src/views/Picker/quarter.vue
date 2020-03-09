<template>
  <div>
    <div class="content">
      <div class="start-content">
        <p class="date_title">开始时间</p>
        <div id="start-con" class="date_container container_left">
          <div class="pr10 content_scroll">
            <div
              class="year_con clearfix"
              v-for="item in data"
              :key="item.year"
            >
              <p class="year fl qua_com_year">{{ item.year }}</p>
              <ul class="quatr_com_ul">
                <li
                  class="cur_pointer li_item"
                  v-for="quarter in item.quarters"
                  :key="quarter.title"
                  :class="{
                    active: inQuarter(quarter.time, startTime.time),
                    disabled: disabledQuarter(quarter.time)
                  }"
                  @click="startHandle(quarter, disabledQuarter(quarter.time))"
                >
                  {{ quarter.titleI18n }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="end-content">
        <p class="date_title">结束时间</p>
        <div class="date_container container_right">
          <div class="pl10 content_scroll">
            <div
              class="year_con clearfix"
              v-for="item in data"
              :key="item.year"
            >
              <p class="year fl qua_com_year">{{ item.year }}</p>
              <ul class="quatr_com_ul">
                <li
                  class="cur_pointer li_item"
                  v-for="quarter in item.quarters"
                  :key="quarter.title"
                  :class="{
                    active: inQuarter(quarter.time, endTime.time),
                    disabled: disabledQuarter(quarter.time)
                  }"
                  @click="endHandle(quarter, disabledQuarter(quarter.time))"
                >
                  {{ quarter.titleI18n }}
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
const quarterI18n = ["一", "二", "三", "四"];
const getQuarterBetweenDate = (year, quarter) => {
  const startDate = moment(moment(year + "-01-01").toDate())
    .quarter(quarter)
    .format("YYYY-MM-DD");
  let endMonth = 3 * parseInt(quarter);
  endMonth = endMonth < 10 ? "0" + endMonth : "" + endMonth;
  const endMonthDays = moment(year + "-" + endMonth).daysInMonth();
  const endDate = year + "-" + endMonth + "-" + endMonthDays;
  return [startDate, endDate];
};

const getYears = ([min, max]) => {
  return [moment(min).year(), moment(max).year()];
};

const getQuatrFirstDay = date => {
  return moment(date)
    .startOf("quarter")
    .format("YYYY-MM-DD");
};
const getQuatrLastDay = date => {
  return moment(date)
    .endOf("quarter")
    .format("YYYY-MM-DD");
};
export default {
  name: "Quarter",
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
    isSingle: {
      type: Boolean,
      default: false
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
      // 判断是不是完整季度, dateRange[1] 是不是当前季度最后一天

      let lastDay = getQuatrLastDay(this.dateRange[1]);
      this.isCompleted = !!(
        lastDay == moment(this.dateRange[1]).format("YYYY-MM-DD")
      );
    },
    calcDefaultDate() {
      const defaultCount = Number(this.defaultCount);
      let data = [];
      const [min, max] = getYears(this.dateRange);
      let currentYear = max;
      let startDate = moment(this.dateRange[1]).subtract(
        defaultCount,
        "quarters"
      );
      if (startDate.format("YYYY-MM-DD") < this.dateRange[0]) {
        startDate = moment(this.dateRange[0]);
      }

      let endDate = this.isCompleted
        ? this.dateRange[1]
        : moment(this.dateRange[1])
            .subtract(1, "quarters")
            .format("YYYY-MM-DD");
      if (endDate < this.dateRange[0]) {
        endDate = this.dateRange[1];
      }

      if (this.selectedDate.length) {
        this.startTime = {
          time: [
            getQuatrFirstDay(this.selectedDate[0]),
            getQuatrLastDay(this.selectedDate[0])
          ],
          titleI18n: `${
            quarterI18n[moment(this.selectedDate[0]).quarter() - 1]
          }季度`,
          title: `${moment(this.selectedDate[0]).year()}年${moment(
            this.selectedDate[0]
          ).quarter()}季度`
        };
        this.endTime = {
          time: [
            getQuatrFirstDay(this.selectedDate[1]),
            getQuatrLastDay(this.selectedDate[1])
          ],
          titleI18n: `${
            quarterI18n[moment(this.selectedDate[1]).quarter() - 1]
          }季度`,
          title: `${moment(this.selectedDate[1]).year()}年${moment(
            this.selectedDate[1]
          ).quarter()}季度`
        };
      } else {
        this.startTime = {
          time: getQuarterBetweenDate(startDate.year(), startDate.quarter()),
          titleI18n: `${quarterI18n[startDate.quarter() - 1]}季度`,
          title: `${startDate.year()}年${startDate.quarter()}季度`
        };
        this.endTime = {
          time: getQuarterBetweenDate(
            moment(endDate).year(),
            moment(endDate).quarter()
          ),
          titleI18n: `${quarterI18n[moment(endDate).quarter() - 1]}季度`,
          title: `${moment(endDate).year()}年${moment(endDate).quarter()}季度`
        };
      }

      for (let i = 0; i < max - min + 1; i++) {
        let times = {
          year: currentYear
        };
        let quarters = [];
        for (let j = 0; j < 4; j++) {
          let quarterObj = {
            titleI18n: `${quarterI18n[j]}季度`,
            title: `${currentYear}年${j + 1}季度`,
            time: getQuarterBetweenDate(currentYear, j + 1)
          };
          quarters.push(quarterObj);
        }
        times.quarters = quarters;
        data.push(times);
        currentYear -= 1;
      }
      this.data = data;
      if (this.selectedDate.length) {
        this.$emit("showResult", this.getItem());
      }
    },
    getItem() {
      let startTime = this.startTime;
      let endTime = this.endTime;
      if (this.startTime.time[0] > this.endTime.time[0]) {
        [startTime, endTime] = [endTime, startTime];
      }

      let selectedTitle = `${startTime.title} -- ${endTime.title}`;

      let selectedDate = [startTime.time[0], endTime.time[1]];

      return {
        unit: "季",
        type: "Quarter",
        typeI18n: "季度",
        selectedTitle,
        selectedDate
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    startHandle(quarter, disabled) {
      if (disabled) return;
      this.startTime = quarter;
    },
    endHandle(quarter, disabled) {
      if (disabled) return;
      this.endTime = quarter;
    },
    inQuarter(dateArray, judgeDateArray) {
      const judgeStartDate = judgeDateArray[0];
      const judgeEndDate = judgeDateArray[1];
      const startDate = dateArray[0];
      const endDate = dateArray[1];
      return judgeStartDate >= startDate && judgeEndDate <= endDate;
    },
    disabledQuarter(dateArray) {
      const judgeNextDate = this.dateRange[1];
      const judgePrevDate = this.dateRange[0];
      const startDate = dateArray[0];
      const endDate = dateArray[1];
      return startDate > judgeNextDate || endDate < judgePrevDate;
    },
    beforeStartTime(start, end) {
      return end[1] < start[0];
    }
  }
};
</script>
