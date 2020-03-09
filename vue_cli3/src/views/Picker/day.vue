<template>
  <div>
    <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
      <div class="el-date-range-picker el-popper">
        <div class="el-picker-panel__body">
          <div
            class="el-picker-panel__content el-date-range-picker__content is-left"
          >
            <p class="date_title">开始时间</p>
            <div class="el-date-range-picker__header">
              <div>
                <button
                  type="button"
                  @click="leftPrevYear"
                  :disabled="disabledLeftYearRangeArrow"
                  :class="{ 'is-disabled': disabledLeftYearRangeArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="leftPrevMonth"
                  :disabled="disabledLeftMonthRangeArrow"
                  :class="{ 'is-disabled': disabledLeftMonthRangeArrow }"
                  class="single_arrow el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
              </div>
              <div class="day-picker-label">
                <el-popover
                  placement="bottom"
                  width="250"
                  trigger="hover"
                  v-model="leftYearPop"
                >
                  <div class="years-pop-select">
                    <div
                      class="year-pop-select cursor"
                      v-for="(year, index) in yearList"
                      :key="index"
                      :class="
                        year === leftDate.getFullYear()
                          ? 'active-year-pop-select'
                          : ''
                      "
                      @click="selectLeftPopYear(year)"
                    >
                      {{ year }}年
                    </div>
                  </div>
                  <span class="week-picker-label cursor" slot="reference"
                    >{{ leftDate.getFullYear() }}年</span
                  >
                </el-popover>
                <el-popover
                  placement="bottom"
                  width="160"
                  trigger="hover"
                  v-model="leftMonthPop"
                >
                  <div class="months-pop-select">
                    <div
                      class="month-pop-select cursor"
                      v-for="(month, index) in 12"
                      :key="index"
                      @click="selectLeftPopMonth(13 - month)"
                      :class="
                        13 - month === leftDate.getMonth() + 1
                          ? 'active-month-pop-select'
                          : ''
                      "
                    >
                      {{ 13 - month }}月
                    </div>
                  </div>
                  <span class="week-picker-label cursor" slot="reference"
                    >{{ leftDate.getMonth() + 1 }}月</span
                  >
                </el-popover>
              </div>
              <div>
                <button
                  type="button"
                  @click="leftNextYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="leftNextMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="single_arrow_right el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
              </div>
            </div>
            <date-table
              selection-mode="range"
              :date="leftDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              :first-day-of-week="firstDayOfWeek"
              @pick="handlePrevRangePick"
            ></date-table>
          </div>
          <div
            class="el-picker-panel__content el-date-range-picker__content is-right"
          >
            <p class="date_title">结束时间</p>
            <div class="el-date-range-picker__header">
              <div>
                <button
                  type="button"
                  @click="rightPrevYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightPrevMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="single_arrow el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
              </div>
              <div class="day-picker-label">
                <el-popover
                  placement="bottom"
                  width="250"
                  trigger="hover"
                  v-model="rightYearPop"
                >
                  <div class="years-pop-select">
                    <div
                      class="year-pop-select cursor"
                      v-for="(year, index) in yearList"
                      :key="index"
                      :class="
                        year === rightDate.getFullYear()
                          ? 'active-year-pop-select'
                          : ''
                      "
                      @click="selectRightPopYear(year)"
                    >
                      {{ year }}年
                    </div>
                  </div>
                  <span class="week-picker-label cursor" slot="reference"
                    >{{ rightDate.getFullYear() }}年</span
                  >
                </el-popover>
                <el-popover
                  placement="bottom"
                  width="160"
                  trigger="hover"
                  v-model="rightMonthPop"
                >
                  <div class="months-pop-select">
                    <div
                      class="month-pop-select cursor"
                      v-for="(month, index) in 12"
                      :key="index"
                      @click="selectRightPopMonth(13 - month)"
                      :class="
                        13 - month === rightDate.getMonth() + 1
                          ? 'active-month-pop-select'
                          : ''
                      "
                    >
                      {{ 13 - month }}月
                    </div>
                  </div>
                  <span class="week-picker-label cursor" slot="reference"
                    >{{ rightDate.getMonth() + 1 }}月</span
                  >
                </el-popover>
              </div>
              <div>
                <button
                  type="button"
                  @click="rightNextYear"
                  :disabled="disabledRightYearRangeArrow"
                  :class="{ 'is-disabled': disabledRightYearRangeArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="rightNextMonth"
                  :disabled="disabledRightMonthRangeArrow"
                  :class="{ 'is-disabled': disabledRightMonthRangeArrow }"
                  class="single_arrow_right el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
              </div>
            </div>
            <date-table
              selection-mode="range"
              :date="rightDate"
              :default-value="defaultValue"
              :min-date="minDate"
              :max-date="maxDate"
              :range-state="rangeState"
              :disabled-date="disabledDate"
              @changerange="handleChangeRange"
              :first-day-of-week="firstDayOfWeek"
              @pick="handleNextRangePick"
            ></date-table>
          </div>
        </div>
      </div>
    </transition>
    <Footer @submit="submit" />
  </div>
</template>

<script type="text/babel">
import {
  isDate,
  modifyWithTimeString,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  nextDate
} from "element-ui/src/utils/date-util";
import Locale from "element-ui/src/mixins/locale";
import DateTable from "./day-item";
import Footer from "./footer";
import moment from "moment";
import { times, reverse } from "lodash";

const calcDefaultValue = defaultValue => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [new Date(defaultValue), nextDate(new Date(defaultValue), 1)];
  } else {
    return [new Date(), nextDate(new Date(), 1)];
  }
};

const formateDateWithRegx = date => {
  return date.replace(/(-)/g, "/");
};

export default {
  mixins: [Locale],
  created() {
    this.calcDefaultDate();
  },
  props: {
    dateRange: {
      type: Array,
      default() {
        return [];
      }
    },

    showRange: {
      type: Boolean,
      default: false
    },
    defaultCount: {
      type: Number,
      default: 30
    },
    selectedDate: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    yearList() {
      const [leftDate, rightDate] = calcDefaultValue(this.dateRange);
      const leftYear = leftDate.getFullYear();
      const rightYear = rightDate.getFullYear();
      let yearList = times(rightYear - leftYear + 1, item => {
        return leftYear + item;
      });

      return reverse(yearList);
    },
    leftYear() {
      return this.leftDate.getFullYear();
    },
    leftMonth() {
      return this.leftDate.getMonth();
    },
    leftMonthDate() {
      return this.leftDate.getDate();
    },
    rightYear() {
      return this.rightDate.getFullYear();
    },
    rightMonth() {
      return this.rightDate.getMonth();
    },
    rightMonthDate() {
      return this.rightDate.getDate();
    },
    enableMonthArrow() {
      return true;
    },
    enableYearArrow() {
      return true;
    },
    disabledRightYearRangeArrow() {
      return false;
    },
    disabledRightMonthRangeArrow() {
      return false;
    },
    disabledLeftYearRangeArrow() {
      return false;
    },
    disabledLeftMonthRangeArrow() {
      return false;
    }
  },
  data() {
    return {
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: "",
      maxDate: "",
      leftDate: new Date(),
      rightDate: nextMonth(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      visible: true,
      disabledDate: "",
      firstDayOfWeek: 7,
      format: "",
      unlinkPanels: true,
      leftYearPop: false,
      leftMonthPop: false,
      rightYearPop: false,
      rightMonthPop: false
    };
  },
  watch: {
    value(newVal) {
      this.calcValue(newVal);
    },
    defaultValue(val) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(val);
        this.leftDate = left;
        this.rightDate =
          val && val[1] && this.unlinkPanels ? right : nextMonth(this.leftDate);
      }
    }
  },
  methods: {
    selectLeftPopYear(year) {
      this.leftDate = new Date(`${year}-${this.leftMonth + 1}-1`);
      this.leftYearPop = false;
    },
    selectLeftPopMonth(month) {
      this.leftDate = new Date(`${this.leftYear}-${month}-1`);
      this.leftMonthPop = false;
    },
    selectRightPopYear(year) {
      this.rightDate = new Date(`${year}-${this.rightMonth + 1}-1`);
      this.rightYearPop = false;
    },
    selectRightPopMonth(month) {
      this.rightDate = new Date(`${this.rightYear}-${month}-1`);
      this.rightMonthPop = false;
    },
    setDefaultValue(value) {
      this.value = value;
      this.calcValue(this.value);
      this.$emit("showResult", this.getItem());
    },
    calcDefaultDate() {
      const dateRange = this.dateRange;
      this.disabledDate = function(date) {
        const judgeDate = moment(date).format("YYYY-MM-DD");
        return dateRange[0] > judgeDate || judgeDate > dateRange[1];
      };
      if (this.selectedDate.length) {
        this.setDefaultValue(this.selectedDate);
        return;
      }

      let startDate = moment(dateRange[1])
        .subtract(this.defaultCount, "days")
        .format("YYYY-MM-DD");
      if (startDate < dateRange[0]) {
        startDate = dateRange[0];
      }
      if (this.showRange) {
        this.value = [...dateRange];
      } else {
        this.value = [startDate, dateRange[1]];
      }

      this.calcValue(this.value);

      //   this.$emit("mountedSelect", this.getItem());
    },
    getItem() {
      let min = moment(this.minDate).format("YYYY-MM-DD");
      let max = moment(this.maxDate).format("YYYY-MM-DD");
      if (min > max) {
        [min, max] = [max, min];
      }

      //中文年月日文本超出
      //   let selectedTitle = `${moment(min).format("YYYY年MM月DD日")} -- ${moment(
      //     max
      //   ).format("YYYY年MM月DD日")}`;

      let selectedTitle = `${moment(min).format("YYYY/MM/DD")} -- ${moment(
        max
      ).format("YYYY/MM/DD")}`;

      let selectedDate = [
        moment(this.minDate).format("YYYY-MM-DD"),
        moment(this.maxDate).format("YYYY-MM-DD")
      ];

      return {
        unit: "日",
        type: "Day",
        typeI18n: "日度",
        selectedTitle,
        selectedDate
      };
    },
    submit() {
      this.$emit("select", this.getItem());
    },
    calcValue(value) {
      if (!value) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(value)) {
        this.minDate = isDate(value[0]) ? new Date(value[0]) : null;
        this.maxDate = isDate(value[1]) ? new Date(value[1]) : null;
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const minDateMonth = this.minDate.getMonth();
            const maxDateYear = this.maxDate.getFullYear();
            const maxDateMonth = this.maxDate.getMonth();
            this.rightDate =
              minDateYear === maxDateYear && minDateMonth === maxDateMonth
                ? nextMonth(this.maxDate)
                : this.maxDate;
          } else {
            this.rightDate = nextMonth(this.leftDate);
          }
        } else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextMonth(this.leftDate);
        }
      }
    },
    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },
    handleNextRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const maxDate = modifyWithTimeString(val, defaultTime[1]);
      this.maxDate = maxDate;
      setTimeout(() => {
        this.maxDate = maxDate;
      }, 10);
    },
    handlePrevRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = modifyWithTimeString(val, defaultTime[0]);
      this.minDate = minDate;
      setTimeout(() => {
        this.minDate = minDate;
      }, 10);
    },
    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },
    leftPrevMonth() {
      this.leftDate = prevMonth(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },
    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      } else {
        this.rightDate = nextYear(this.rightDate);
      }
    },
    rightNextMonth() {
      if (!this.unlinkPanels) {
        this.leftDate = nextMonth(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      } else {
        this.rightDate = nextMonth(this.rightDate);
      }
    },
    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate);
    },
    leftNextMonth() {
      this.leftDate = nextMonth(this.leftDate);
    },
    rightPrevYear() {
      this.rightDate = prevYear(this.rightDate);
    },
    rightPrevMonth() {
      this.rightDate = prevMonth(this.rightDate);
    }
    // submit() {
    //   this.$emit("select", this.getItem());
    // }
  },
  components: { DateTable, Footer }
};
</script>

<style lang="scss" scoped>
.el-date-range-picker {
  width: 560px;
}
.day-picker-label {
  font-size: 14px;
  color: rgba(123, 139, 171, 1);
  cursor: pointer;
}
.el-date-range-picker__content {
  .single_arrow {
    margin-left: 28px;
  }
  .single_arrow_right {
    margin-right: 28px;
  }

  &.is-left {
    border-right: 0;
    padding: 0 12px 0 0;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 42px;
      bottom: 0;
      width: 1px;
      background: rgba(255, 255, 255, 0.3);
    }
  }
  &.is-right {
    padding: 0 0 0 12px;
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

  div {
    margin: 0 !important;
  }
}

.el-picker-panel__icon-btn {
  margin-top: 0 !important;
  color: $compon_dark_font_color;
  &:hover {
    color: $compon_sec_color;
  }
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
  cursor: pointer;

  &:hover {
    color: $compon_sec_color;
  }
}

.months-pop-select {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
}

.active-month-pop-select {
  color: $compon_sec_color;
  background-color: rgba(0, 113, 231, 0.1);
  cursor: pointer;
}

.month-pop-select {
  width: 33%;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: $compon_sec_color;
  }
}

.week-picker-label {
  &:hover {
    color: $compon_sec_color;
  }
}
</style>
