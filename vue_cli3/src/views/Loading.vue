<template>
  <div>
    <div
      class="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >loading</div>

    <div
      class="loading"
      v-loading="loading2"
      element-loading-text="加载中"
    >loading</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      loading2: true
    };
  }
};
</script>

<style lang="scss" scoped>
.loading {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border: 1px solid #999;
}

</style>