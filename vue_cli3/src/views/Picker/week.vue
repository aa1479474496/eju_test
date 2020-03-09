<template>
  <div>
    <div class="content" v-if="years.length > 0">
      <div class="start-content">
        <p class="date_title">开始时间</p>
        <div id="start-con" class="date_container container_left border_right">
          <div class="el-date-range-picker__header">
            <button
              type="button"
              @click="leftPrevYear"
              :disabled="disabledLeftPrevYearArrow"
              :class="{ 'is-disabled': disabledLeftPrevYearArrow }"
              class="el-picker-panel__icon-btn el-icon-d-arrow-left"
            ></button>
            <el-popover
              placement="bottom"
              width="210"
              trigger="hover"
              v-model="leftPop"
            >
              <div class="years-pop-select">
                <div
                  v-for="(year, index) in years"
                  :key="index"
                  class="year-pop-select cur_pointer"
                  :class="
                    index === activePrevYearIndex
                      ? 'active-year-pop-select'
                      : ''
                  "
                  @click="selectLeftPopYear(index)"
                >
                  {{ year }}
                </div>
              </div>
              <div class="week-picker-label cur_pointer" slot="reference">
                {{ years[activePrevYearIndex] }}
              </div>
            </el-popover>
            <button
              type="button"
              @click="leftNextYear"
              :disabled="disabledLeftNextYearArrow"
              :class="{ 'is-disabled': disabledLeftNextYearArrow }"
              class="el-picker-panel__icon-btn el-icon-d-arrow-right"
            ></button>
          </div>
          <div class="year_con content_scroll week_scroll">
            <ul>
              <li
                class="cur_pointer week_item"
                v-for="(week, index) in reverseList(
                  weekList[years[activePrevYearIndex]]
                )"
                :key="index"
                :class="[
                  { active: startTime.weekRange[0] === week.weekRange[0] },
                  { disabled: isDisabled(week.weekRange) }
                ]"
                @click="startHandle(week, isDisabled(week.weekRange))"
              >
                <p class="week-count">{{ week.weekCount }}周</p>
                <p class="week-range">
                  {{
                    `${handleDate(week.weekRange[0])}-${handleDate(
                      week.weekRange[1]
                    )}`
                  }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="end-content">
        <p class="date_title">结束时间</p>
        <div class="date_container container_right">
          <div class="el-date-range-picker__header">
            <button
              type="button"
              @click="rightPrevYear"
              :disabled="disabledRightPrevYearArrow"
              :class="{ 'is-disabled': disabledRightPrevYearArrow }"
              class="el-picker-panel__icon-btn el-icon-d-arrow-left"
            ></button>
            <el-popover
              placement="bottom"
              width="200"
              trigger="hover"
              v-model="rightPop"
            >
              <div class="years-pop-select">
                <div
                  v-for="(year, index) in years"
                  :key="index"
                  class="year-pop-select cur_pointer"
                  :class="
                    index === activeNextYearIndex
                      ? 'active-year-pop-select'
                      : ''
                  "
                  @click="selectRightPopYear(index)"
                >
                  {{ year }}
                </div>
              </div>
              <div class="week-picker-label cur_pointer" slot="reference">
                {{ years[activeNextYearIndex] }}
              </div>
            </el-popover>
            <button
              type="button"
              @click="rightNextYear"
              :disabled="disabledRightNextYearArrow"
              :class="{ 'is-disabled': disabledRightNextYearArrow }"
              class="el-picker-panel__icon-btn el-icon-d-arrow-right"
            ></button>
          </div>
          <div class="year_con content_scroll week_scroll">
            <ul>
              <li
                class="cur_pointer week_item"
                v-for="(week, index) in reverseList(
                  weekList[years[activeNextYearIndex]]
                )"
                :key="index"
                :class="[
                  { active: endTime.weekRange[0] === week.weekRange[0] },
                  { disabled: isDisabled(week.weekRange) }
                ]"
                @click="endHandle(week, isDisabled(week.weekRange))"
              >
                <p class="week-count">{{ week.weekCount }}周</p>
                <p class="week-range">
                  {{
                    `${handleDate(week.weekRange[0])}-${handleDate(
                      week.weekRange[1]
                    )}`
                  }}
                </p>
              </li>
            </ul>
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
// import { formatTime } from "src/utils/date";
import { keys, sortBy, last, reverse, find, cloneDeep } from "lodash";

const formateDateWithRegx = date => {
  return date.replace(/(-)/g, "/");
};

export default {
  name: "week",
  components: {
    Footer
  },
  created() {
    this.calcDefaultDate();
  },
  data() {
    return {
      data: [],
      activeNextYearIndex: 0,
      activePrevYearIndex: 0,
      startTime: {},
      endTime: {},
      enableYearArrow: true,
      leftPop: false,
      rightPop: false
    };
  },
  props: {
    weekList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    defaultCount: {
      type: Number,
      default: 13
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
  computed: {
    years() {
      return sortBy(keys(this.weekList), item => -item);
    },
    disabledLeftPrevYearArrow() {
      return this.activePrevYearIndex + 1 >= this.years.length;
    },
    disabledLeftNextYearArrow() {
      return this.activePrevYearIndex <= 0;
    },
    disabledRightPrevYearArrow() {
      return this.activeNextYearIndex + 1 >= this.years.length;
    },
    disabledRightNextYearArrow() {
      return this.activeNextYearIndex <= 0;
    }
  },
  methods: {
    selectLeftPopYear(index) {
      this.leftPop = false;
      this.activePrevYearIndex = index;
    },
    selectRightPopYear(index) {
      this.rightPop = false;
      this.activeNextYearIndex = index;
    },
    reverseList(list) {
      return reverse(cloneDeep(list));
    },
    calcDefaultDate() {
      this.isCompleted = moment(this.dateRange[1]).days() === 0;

      const currentYear = reverse(
        cloneDeep(this.weekList[this.years[this.activeNextYearIndex]])
      ).filter(item => {
        return !this.isDisabled(item.weekRange);
      });
      let startTime;
      const defaultCount = Number(this.defaultCount);
      if (currentYear.length > defaultCount) {
        startTime = currentYear[defaultCount];
        if (startTime.weekRange[1] < this.dateRange[0]) {
          startTime = find(currentYear, item => {
            let [weekPrev, weekNext] = item.weekRange;
            return (
              weekPrev >= this.dateRange[0] && weekNext >= this.dateRange[1]
            );
          });
        }
      } else {
        this.activePrevYearIndex = 1;
        let currentPrevYear = reverse(
          cloneDeep(this.weekList[this.years[this.activePrevYearIndex]])
        );
        currentPrevYear = (currentPrevYear || []).filter(item => {
          return !this.isDisabled(item.weekRange);
        });

        if (currentPrevYear.length === 0) {
          startTime = find(currentYear, item => {
            let [weekPrev, weekNext] = item.weekRange;
            return (
              this.dateRange[0] >= weekPrev && weekNext >= this.dateRange[1]
            );
          });
          this.activePrevYearIndex = 0;
        } else {
          startTime = currentPrevYear[defaultCount - currentYear.length]
            ? currentPrevYear[defaultCount - currentYear.length]
            : last(currentPrevYear);
          if (startTime.weekRange[1] < this.dateRange[0]) {
            startTime = find(currentPrevYear, item => {
              let [weekPrev, weekNext] = item.weekRange;
              return (
                weekPrev >= this.dateRange[0] && weekNext >= this.dateRange[1]
              );
            });
          }
        }
      }
      this.startTime = startTime;
      if (
        currentYear.length > 1 ||
        (currentYear.length === 1 && this.isCompleted)
      ) {
        this.endTime = currentYear[this.isCompleted ? 0 : 1];
      } else {
        this.activePrevYearIndex = 1;
        let prevYear = reverse(
          cloneDeep(this.weekList[this.years[this.activePrevYearIndex]])
        );
        prevYear = (prevYear || []).filter(item => {
          return !this.isDisabled(item.weekRange);
        });

        if (prevYear[0]) {
          this.endTime = prevYear[0];
        } else {
          this.endTime = this.startTime;
          this.activePrevYearIndex = 0;
        }
      }

      if (this.selectedDate.length) {
        this.startTime = this.sceDateInit(this.selectedDate[0]);
        this.endTime = this.sceDateInit(this.selectedDate[1]);
        this.$emit("showResult", this.getItem());
      }
    },

    sceDateInit(date) {
      let _startDay = moment(date)
        .week(moment(date).week())
        .startOf("week")
        .format("YYYY-MM-DD");
      let _endDay = moment(date)
        .week(moment(date).week())
        .endOf("week")
        .format("YYYY-MM-DD");
      let _week = moment(_startDay).week();
      return {
        weekRange: [_startDay, _endDay],
        weekCount: _week
      };
    },
    getItem(showTooltip = false) {
      let start = this.startTime;
      let end = this.endTime;
      if (start.weekRange[0] > end.weekRange[0]) {
        [start, end] = [end, start];
      }

      let startCount = this.activePrevYearIndex;
      let endCount = this.activeNextYearIndex;
      if (startCount < endCount) {
        [startCount, endCount] = [endCount, startCount];
      }
      // 周度算在前一年导致的问题
      let endYearList = this.weekList[this.years[endCount]];
      if (!find(endYearList, item => item.weekRange[0] === end.weekRange[0])) {
        endCount = endCount + 1;
      }
      const startWeekCount =
        start.weekCount < 10 ? `0${start.weekCount}` : start.weekCount;
      const endWeekCount =
        end.weekCount < 10 ? `0${end.weekCount}` : end.weekCount;
      const title = `${this.years[startCount]}年${startWeekCount}周 -- ${this.years[endCount]}年${endWeekCount}周`;

      let selectedTitle = title;

      let startSecDate = formateDateWithRegx(start.weekRange[0]);
      let endSecDate = formateDateWithRegx(end.weekRange[1]);
      let selectedDate = [startSecDate, endSecDate];

      return {
        unit: "周",
        type: "Week",
        typeI18n: "周度",
        selectedTitle,
        selectedDate
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    startHandle(week, isDisabled) {
      if (isDisabled) return;

      this.startTime = week;
    },
    endHandle(week, isDisabled) {
      if (isDisabled) return;

      this.endTime = week;
    },
    handleDate(date) {
      let array = date.split("-");
      array.splice(0, 1);
      return array.join("/");
    },
    leftPrevYear() {
      if (this.disabledLeftPrevYearArrow) return;
      this.activePrevYearIndex = this.activePrevYearIndex + 1;
    },
    leftNextYear() {
      if (this.disabledLeftNextYearArrow) return;
      this.activePrevYearIndex = this.activePrevYearIndex - 1;
    },
    rightPrevYear() {
      if (this.disabledRightPrevYearArrow) return;
      this.activeNextYearIndex = this.activeNextYearIndex + 1;
    },
    rightNextYear() {
      if (this.disabledRightNextYearArrow) return;
      this.activeNextYearIndex = this.activeNextYearIndex - 1;
    },
    isDisabled(week) {
      const [weekPrev, weekNext] = week;
      const [datePrev, dateNext] = this.dateRange;
      return !(weekPrev <= dateNext || datePrev > weekNext);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .date_container {
    div.year_con {
      ul {
        li {
          margin-bottom: 10px;
          text-align: center;
          &:hover {
            .week-count {
              color: $compon_sec_color;
            }
            .week-range {
              color: $compon_sec_color;
            }
          }
          &.active {
            .week-count {
              color: #fff;
            }
            .week-range {
              color: #fff;
            }
            background-color: $compon_sec_color;
          }
          &.disabled {
            color: #7b8bab;
            opacity: 0.3;
            &:hover {
              cursor: not-allowed;
            }
          }
          .week-count {
            padding-top: 3px;
            font-size: 14px;
            color: $g_text_color;
          }
          .week-range {
            margin-top: 1px;
            padding-bottom: 3px;
            line-height: 14px;
            font-size: 10px;
            color: rgba(176, 185, 205, 0.5);
          }
        }
      }
    }
  }
}

.week-picker-label {
  font-size: 14px;
  color: rgba(123, 139, 171, 1);
  width: 100%;

  &:hover {
    color: $compon_sec_color;
  }
}

.disabled {
  background: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}

.years-pop-select {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}

.active-year-pop-select {
  color: $compon_sec_color;
  background-color: rgba(0, 113, 231, 0.1);
}

.year-pop-select {
  width: 25%;
  font-size: 14px;
  line-height: 24px;
  text-align: center;

  &:hover {
    color: $compon_sec_color;
  }
}

.el-picker-panel__icon-btn {
  margin-top: 0 !important;
  color: $compon_dark_font_color;
  &:hover {
    color: $compon_sec_color;
  }
}

.el-date-range-picker__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
}
</style>
