<template>
  <div class="filter_com_box">
    <p class="filter_com_title">{{ itemData.title }}</p>
    <el-popover
      placement="bottom-end"
      trigger="click"
      v-model="isDisabled"
      popper-class="region_select_popper com_border_popper"
    >
      <div class="date_con com_popper_container">
        <div class="left" v-if="itemData.value && itemData.value.length">
          <div class="header">时间选择</div>

          <ul class="mt8">
            <li
              :class="[
                'date_type_item',
                item.name == activeMenu.name ? 'is_active' : ''
              ]"
              v-for="item in itemData.value"
              :key="item.name"
              @click="selectMenu(item)"
            >
              {{ item.name }}
            </li>
          </ul>

          <div class="sort_btn_group">
            <el-radio v-model="sort" :label="true">正序显示</el-radio>
            <el-radio v-model="sort" :label="false">倒序显示</el-radio>
          </div>
        </div>

        <div class="right">
          <component
            :is="currentComponent"
            :dateRange="itemData.dataRange"
            :selectedDate="selectedDate"
            :weekList="this.weekList"
            @select="selectDate"
            @showResult="showResult"
          />
        </div>
      </div>
      <div slot="reference" class="with_icon_block">
        <i class="iconfont iconinterfacecalendar"></i>

        <span>{{ result }}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import "./picker.scss";
import mockData from "./mock.js";
import MonthComplete from "./monthComplete";
import WeekComplete from "./weekComplete";
import Day from "./day";
import Month from "./month";
import Quarter from "./quarter";
import Year from "./year";
import Week from "./week";
import moment from "moment";
moment.updateLocale("en", {
  week: {
    dow: 1, // 星期的第一天是星期一
    doy: 1 // doy 的计算方式为 7 + dow - janX，其中 janX 是一月的第一天（必须属于年份中的第一周）。
  }
});
export default {
  components: {
    MonthComplete,
    WeekComplete,
    Day,
    Month,
    Quarter,
    Year,
    Week
  },
  //   props: {
  //     itemData: {
  //       type: Object,
  //       default() {
  //         return {};
  //       }
  //     }
  //   },
  computed: {
    currentComponent() {
      return this.activeMenu.component;
    },

    selectedDate() {
      if (this.dataV.type && this.activeMenu.component === this.dataV.type) {
        return this.dataV.value;
      }
      return [];
    }
  },

  data() {
    return {
      itemData: mockData,
      value: ["", "", "date"],
      dataV: {},
      sort: true,
      isDisabled: false,
      activeMenu: {},
      result: "日期",
      weekList: {}
    };
  },

  mounted() {
    this.init();

    this.getWeekList(this.itemData.dataRange[0], this.itemData.dataRange[1]);
  },

  methods: {
    init() {
      let v = localStorage.getItem(this.itemData.field);
      if (v) {
        v = JSON.parse(v);
        this.dataV = v;
        // this.selectedDate = v.value;
        this.activeMenu = this.itemData.value.find(item => {
          return item.component == v.type;
        });
        return;
      }
      this.activeMenu = this.itemData.value[0];
    },
    selectMenu(item) {
      this.activeMenu = item;
    },
    showResult(data) {
      console.log("1111111", data);
      const { type, typeI18n, selectedTitle, selectedDate, unit } = data;
      this.selectedTitle = selectedTitle;
      this.selectedTitleType = typeI18n;

      let time = {
        type,
        value: selectedDate,
        sort: Number(this.sort)
      };

      this.result = `${typeI18n}  ${selectedTitle}`;
      // 模拟存储
      localStorage.setItem(this.itemData.field, JSON.stringify(time));
    },
    selectDate(data) {
      this.showResult(data);
      this.isDisabled = false;
    },

    //计算周
    getWeekList(startTime, endTime) {
      let list = {};

      let _startDay = moment(startTime)
        .week(moment(startTime).week())
        .startOf("week")
        .format("YYYY-MM-DD");
      let _endDay = moment(endTime)
        .week(moment(endTime).week())
        .endOf("week")
        .format("YYYY-MM-DD");

      let startDay = moment(_startDay);
      let endDay = moment(_endDay);
      let _tempYear = startDay.year() - 1;
      let _index = 0;
      while (!startDay.isAfter(endDay)) {
        let _year = startDay.year();
        if (_tempYear != _year && startDay.days() === 1) {
          _tempYear = _year;
          _index = 0;
        }
        if (!list[_tempYear]) {
          list[_tempYear] = [];
        }

        let _week = startDay.week();

        if (!list[_tempYear][_index]) {
          list[_tempYear][_index] = {
            weekRange: [],
            weekCount: _week
          };
        }
        if (startDay.days() === 1) {
          list[_tempYear][_index].weekRange[0] = moment(startDay).format(
            "YYYY-MM-DD"
          );
        } else if (startDay.days() === 0) {
          list[_tempYear][_index].weekRange[1] = moment(startDay).format(
            "YYYY-MM-DD"
          );
          _index++;
        }

        startDay.add(1, "d");
      }
      this.weekList = list;
      //   console.log("list", list);
    }
  },

  watch: {}
};
</script>
