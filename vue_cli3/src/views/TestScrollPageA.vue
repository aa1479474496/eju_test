<template>
    <div class="box">
      <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: ''
      };
    }
  };
</script>

<style lang="scss" style="scoped">
    .box {
        border:1px solid red;
        height: 1500px;
    }
</style>