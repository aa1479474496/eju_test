<template>
  <div :class="['box', is_high ? 'is_high' : '']">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
    ></el-date-picker>
    <el-button @click="testHeight">test</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      is_high: false
    };
  },

  methods: {
    testHeight() {
      setTimeout(() => {
        console.log("test");
        this.is_high = !this.is_high;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" style="scoped">
.box {
  border: 1px solid red;
  height: 300px;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;

  &.is_high {
    height: 1500px;
  }
}
</style>