<template>
  <div class="content_b">
    <div class="scroll">scroll</div>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      :picker-options="pickerOptions"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @focus="handlerFocus"
    ></el-date-picker>
  </div>
</template>


<script>
let startTime = new Date("2018/01/01").getTime();
let stopTime = new Date().getTime();
let start = startTime;
let end = stopTime;
import moment from "moment";
export default {
  computed: {
    // pickerOptions() {
    //   return {
    //     disabledDate(time) {
    //       const timestamp = time.getTime();
    //       let start = moment(timestamp).day(-3);
    //       let end = moment(timestamp).day(3);
    //       if (timestamp >= start && timestamp < end) {
    //         return false;
    //       }
    //       return true;
    //     }
    //   };
    // }
  },
  data() {
    return {
      value1: "",
      name: "1",
      pickerOptions: {
        onPick(date) {
          let { minDate } = date;
          start = moment(minDate).day(-1);
          end = moment(minDate).day(3);

          start = moment(minDate).subtract(1, "days");
          end = moment(minDate).add("days", 3);
          console.log("start", moment(start).format("YYYY MM DD"));
          console.log("end", moment(end).format("YYYY MM DD"));
        },
        disabledDate(time) {
          const timestamp = time.getTime();
          if (timestamp >= start && timestamp < end) {
            return false;
          }

          return true;
        }
      }
    };
  },

  methods: {
    handlerFocus(eve) {
      console.log("eve", eve);
      start = startTime;
      end = stopTime;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log('aaa');
      // $('.content_b').niceScroll();
      //   console.log("d", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

      console.log(
        "dddd",
        moment("2018/01/01")
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      );
    });
  }
};
</script>

<style lang="scss" style="scoped">
.content_b {
  border: 1px solid black;
  max-height: 300px;
  overflow-y: auto;

  .scroll {
    height: 500px;
    background: gold;
  }
}
</style>